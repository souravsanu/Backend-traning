const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    authorId: { type: objectId, require: true, ref: "Author" },
    tags: { type: [] },
    category: { type: String, require: true }, //examples: [technology, entertainment, life style, food, fashion]
    subcategory: { type: [] }, //examples[technology-[web development, mobile development, AI, ML etc]]
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
