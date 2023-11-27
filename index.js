const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://souravmondal01bscctis:Kih4dK4vaFvWrBmR@cluster0.svnzmny.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const supabase = createClient('https://tlmrkqdffutnmoetcxgx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbXJrcWRmZnV0bm1vZXRjeGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDA2OTQsImV4cCI6MjAxNjQxNjY5NH0.f6ctcFYAj93zn0CmzxM9pbPwrTE2nSm75HM6uk1bRKc');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const videoSchema = new mongoose.Schema({
  url: String,
  transcript: String,
  segments: [
    {
      start: Number,
      end: Number,
      url: String,
      caption: String,
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);

const openai = new OpenAI(`'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'`);


async function transcribeAndSegment(videoURL) {
  try {

    const transcriptionResponse = await openai.transcribe({
      audioUrl: videoURL,
      model: 'whisper-large',
    });

    const transcript = transcriptionResponse.data.text;

   
    const segmentationResponse = await openai.segment({
      model: 'text-davinci-003',
      prompt: transcript,
    });

    const segments = segmentationResponse.data.choices.map((choice) => {
     
      const [start, end] = choice.text.split('-').map(Number);

      
      return {
        start,
        end,
        url: `segment_${index + 1}.mp4`,
        caption: `choice.text`,
      };
    });

    return { transcript, segments };
  } catch (error) {
    console.error('Error during transcription and segmentation:', error);
    throw error;
  }
}


async function cutVideoSegments(videoURL, segments) {
  try {
    
    const outputDirectory = 'segmented-videos';
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

  
    for (const segment of segments) {
      const { start, end, url, caption } = segment;

     
      await new Promise((resolve, reject) => {
        ffmpeg(videoURL)
          .setStartTime(start)
          .setDuration(end - start)
          .output(`${outputDirectory}/${url}`)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });

      
      await new Promise((resolve, reject) => {
        ffmpeg(`${outputDirectory}/${url}`)
          .videoFilters(`drawtext=text='${caption}':fontsize=24:box=1:boxcolor=white@0.8:boxborderw=5:x=(w-text_w)/2:y=(h-text_h)/2`)
          .output(`${outputDirectory}/${url}`)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
    }
  } catch (error) {
    console.error('Error during video segmentation:', error);
    throw error;
  }
}


app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from(`'Sourav Mondal'`) 
      .upload('videos/' + req.file.originalname, req.file.buffer);

    if (error) {
      throw error;
    }

    const videoURL = data.url;

    
    const { transcript, segments } = await transcribeAndSegment(videoURL);

    
    const newVideo = new Video({ url: videoURL, transcript, segments });
    await newVideo.save();

    
    await cutVideoSegments(videoURL, segments);

    res.json({ success: true, message: 'Video uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error uploading video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
