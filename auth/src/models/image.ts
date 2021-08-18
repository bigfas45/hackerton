import mongoose from 'mongoose';


// An interface that describe the properties that are required to create a new User

interface ImageAttrs {
  user: string;
  link: string;
}

interface ImageModel extends mongoose.Model<ImageDoc> {
  build(attrs: ImageAttrs): ImageDoc;
}

// An interface that describes the properties that a user document has

interface ImageDoc extends mongoose.Document {
  user: string;
  link: string;
}

const ImageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },

    link: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ImageSchema.statics.build = (attrs: ImageAttrs) => {
  return new Image(attrs);
};

const Image = mongoose.model<ImageDoc, ImageModel>('Image', ImageSchema);

export { Image };
