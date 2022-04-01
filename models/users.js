// import mongoose from 'mongoose'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universities_schema = new Schema({
  grad_date: {
    type: String,
    // required: true
  },
  linkedin: {
    type: String,
    // required: true
  },
  major: {
    type: String,
    // required: true
  },
  uni_ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "University" }],
  visit_type: {
    type: String,
    // required: true
  },
  country: {
    type: String,
    // required: true
  },
  region: {
    type: String,
    // required: true
  },
});

const residency_schema = new Schema({
  country: {
    type: String,
    // required: true
  },
  region: {
    type: String,
    // required: true
  },
});

const entities_schema = new Schema({
  country: {
    type: String,
    // required: true
  },
  region: {
    type: String,
    // required: true
  },

  department: {
    type: String,
    // required: true
  },
  end_date: {
    type: String,
    // required: true
  },

  job_title: {
    type: String,
    // required: true
  },
  linkedin: {
    type: String,
    // required: true
  },
  start_date: {
    type: String,
    // required: true
  },
  entity_ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entity" }],
  isCurrent: {
    type: Boolean,
    // required: true
  },
});

const User = new Schema(
  {
    g_userid: {
      type: String,
      // required: true
    },
    g_picture: {
      type: String,
      // required: true
    },
    zc_email: {
      type: String,
      // required: true
    },
    g_name: {
      type: String,
      // required: true
    },
    first_name: {
      type: String,
      // required: true
    },
    last_name: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      // required: true
    },
    residency: {
      type: residency_schema,
      // required: true
    },
    phone: {
      type: String,
      // required: true
    },
    birth_date: {
      type: String,
    },
    address: {
      type: String,
      // required: true
    },
    zc_id: {
      type: String,
      // required: true
    },
    grad_year: {
      type: String,
      // required: true
    },
    major: {
      type: String,
      // required: true
    },
    minor: {
      type: String,
      // required: true
    },
    other_undergraduate_data: {
      type: String,
      // required: true
    },
    universities: {
      type: [universities_schema],
      // required: true
    },
    entities: {
      type: [entities_schema],
      // required: true
    },
    admin: {
      type: Boolean,
      default: false,
    },
    experience_field: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ExperiencField" },
    ],
  },
  {
    timestamps: true,
  }
);

// export default mongoose.models.User || mongoose.model('User', User)

module.exports = {
  Users: mongoose.models.User || mongoose.model("User", User),
};
