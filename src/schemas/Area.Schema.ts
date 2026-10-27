import * as yup from "yup";
import { AREA_TYPES } from "../api/office";



export const areaSchema = yup.object({
    name: yup.string().trim().required("name is required.").max(50, "Name must not exceed 50 characters."),
    type: yup.string().oneOf(AREA_TYPES, "Choose a type.").required(),
     x: yup.number().typeError("X must be a number.")
            .integer("X must be a whole number.").min(0, "X can't be negative.").required("X is required."),
        y: yup.number().typeError("Y must be a number.")
            .integer("Y must be a whole number.").min(0, "Y can't be negative.").required("Y is required."),
             height: yup.number().typeError("height must be a number.")
            .integer("height must be a whole number.").min(1, "height can't be 0/negetive.").required("height is required."),
        width: yup.number().typeError("width must be a number.")
            .integer("width must be a whole number.").min(1, "width can't be 0/negative.").required("width is required."),
});


export type CreateAreaForm = yup.InferType<typeof areaSchema>;
