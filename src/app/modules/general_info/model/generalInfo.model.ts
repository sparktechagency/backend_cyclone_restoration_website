import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const siteInfoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
      unique: false,
      default: () => 'general_info_' + ar7id(),
    },
    office_address: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    company_phone_number: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    company_email_address: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    privacy_policy: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },

    terms_and_conditions: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    about_us: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    team_agreement: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    faqs: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

export const generalInfoModelOfMantled = mongoose.model(
  'general_info',
  siteInfoSchema
);

export const GeneralInfoModel = generalInfoModelOfMantled;
const createGeneralInfoForFirstTime = async () => {
  const generalInfoData = await GeneralInfoModel.findOne();
  if (!generalInfoData) {
    const newData = await GeneralInfoModel.create({});
    console.log(newData);
  }
};
createGeneralInfoForFirstTime();
