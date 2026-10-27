import * as yup from "yup";

const OS_VALUES = ["WINDOWS", "MACOS", "LINUX"] as const;
const ROTATIONS = [0, 90, 180, 270] as const;
const DESK_STATUSES = ["ACTIVE", "MAINTENANCE"] as const;

const baseDeskSchema = yup.object({
    label: yup.string().trim().required("Label is required.")
        .max(20, "Label must not exceed 20 characters."),
    areaId: yup.string().required("Area is required."),
    x: yup.number().typeError("X must be a number.")
        .integer("X must be a whole number.").min(0, "X can't be negative.").required("X is required."),
    y: yup.number().typeError("Y must be a number.")
        .integer("Y must be a whole number.").min(0, "Y can't be negative.").required("Y is required."),
    rotation: yup.number().oneOf(ROTATIONS, "Choose a rotation.").required(),
    os: yup.string().oneOf(OS_VALUES, "Choose an operating system.").required("Operating system is required."),
    software: yup.array().of(yup.string().required()).default([]),
    accessibility: yup.array().of(yup.string().required()).default([]),
});

export const createDeskSchema = baseDeskSchema;

export const editDeskSchema = baseDeskSchema.shape({
    status: yup.string().oneOf(DESK_STATUSES, "Choose a status.").required(),
});

export type CreateDeskForm = yup.InferType<typeof createDeskSchema>;
export type EditDeskForm = yup.InferType<typeof editDeskSchema>;