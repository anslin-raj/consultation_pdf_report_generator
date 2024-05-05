import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Card,
    CardContent,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";

import { createReport } from "../features/reports/reportsSlice";

import ReactQuill from "react-quill";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import "./ReportForm.css";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    clinic_name: Yup.string().required("Clinic Name is required"),
    physician_name: Yup.string().required("Physician Name is required"),
    physician_contact: Yup.string()
        .email("Invalid email format")
        .required("Physician Contact is required"),
    patient_first_name: Yup.string().required("First Name is required"),
    patient_last_name: Yup.string(),
    patient_dob: Yup.date().required("Date of Birth is required"),
    patient_contact: Yup.string()
        .email("Invalid email format")
        .required("Patient Contact is required"),
    chief_complaint: Yup.string().required("Chief Complaint is required"),
    consultation_notes: Yup.string().required("Consultation Notes is required"),
    logo: Yup.mixed().required("Logo is required"),
});

const ReportForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        title: "Consultation Report",
        clinic_name: "",
        physician_name: "",
        physician_contact: "",
        patient_first_name: "",
        patient_last_name: "",
        patient_dob: "",
        patient_contact: "",
        chief_complaint: "",
        consultation_notes: "",
        logo: null,
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(createReport(values));
        resetForm();
        navigate("/reports");
    };

    return (
        <Card>
            <CardContent>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        handleChange,
                        setFieldValue,
                        errors,
                        touched,
                        handleBlur,
                    }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Clinic and Physician Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="clinic_name"
                                        as={TextField}
                                        label="Clinic Name"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            touched.clinic_name &&
                                            Boolean(errors.clinic_name)
                                        }
                                        helperText={
                                            touched.clinic_name &&
                                            errors.clinic_name
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="physician_name"
                                        as={TextField}
                                        label="Physician Name"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            touched.physician_name &&
                                            Boolean(errors.physician_name)
                                        }
                                        helperText={
                                            touched.physician_name &&
                                            errors.physician_name
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="physician_contact"
                                        as={TextField}
                                        label="Physician Contact"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            touched.physician_contact &&
                                            Boolean(errors.physician_contact)
                                        }
                                        helperText={
                                            touched.physician_contact &&
                                            errors.physician_contact
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Patient Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="patient_first_name"
                                        as={TextField}
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            touched.patient_first_name &&
                                            Boolean(errors.patient_first_name)
                                        }
                                        helperText={
                                            touched.patient_first_name &&
                                            errors.patient_first_name
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="patient_last_name"
                                        as={TextField}
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="patient_dob"
                                        as={TextField}
                                        label="Date of Birth"
                                        variant="outlined"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={
                                            touched.patient_dob &&
                                            Boolean(errors.patient_dob)
                                        }
                                        helperText={
                                            touched.patient_dob &&
                                            errors.patient_dob
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name="patient_contact"
                                        as={TextField}
                                        label="Contact"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            touched.patient_contact &&
                                            Boolean(errors.patient_contact)
                                        }
                                        helperText={
                                            touched.patient_contact &&
                                            errors.patient_contact
                                        }
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Consultation Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8">
                                        Chief Complaint
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="chief_complaint">
                                        {({ field }) => (
                                            <ReactQuill
                                                className={
                                                    touched.chief_complaint &&
                                                    errors.chief_complaint
                                                        ? "error-border"
                                                        : "quill-field"
                                                }
                                                {...field}
                                                onChange={(
                                                    newValue,
                                                    delta,
                                                    source
                                                ) => {
                                                    if (source === "user") {
                                                        setFieldValue(
                                                            "chief_complaint",
                                                            newValue
                                                        );
                                                    }
                                                }}
                                                onBlur={(
                                                    range,
                                                    source,
                                                    quill
                                                ) => {
                                                    setFieldValue(
                                                        "chief_complaint",
                                                        quill.getHTML()
                                                    );
                                                }}
                                            />
                                        )}
                                    </Field>
                                    {(touched.chief_complaint ||
                                        Boolean(errors.chief_complaint)) && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            style={{ marginLeft: "10px" }}
                                        >
                                            {errors.chief_complaint}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8">
                                        Consultation Notes
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="consultation_notes">
                                        {({ field }) => (
                                            <ReactQuill
                                                className={
                                                    touched.chief_complaint &&
                                                    errors.chief_complaint
                                                        ? "error-border"
                                                        : "quill-field"
                                                }
                                                {...field}
                                                onChange={(
                                                    newValue,
                                                    delta,
                                                    source
                                                ) => {
                                                    if (source === "user") {
                                                        setFieldValue(
                                                            "consultation_notes",
                                                            newValue
                                                        );
                                                    }
                                                }}
                                                onBlur={(
                                                    range,
                                                    source,
                                                    quill
                                                ) => {
                                                    setFieldValue(
                                                        "consultation_notes",
                                                        quill.getHTML()
                                                    );
                                                }}
                                            />
                                        )}
                                    </Field>
                                    {(touched.consultation_notes ||
                                        Boolean(errors.consultation_notes)) && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            style={{ marginLeft: "10px" }}
                                        >
                                            {errors.consultation_notes}
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Clinic Logo
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl variant="logo" fullWidth>
                                        <OutlinedInput
                                            id="logo"
                                            type="file"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    "logo",
                                                    e.currentTarget.files[0]
                                                )
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="upload picture"
                                                        component="label"
                                                    >
                                                        <PhotoCamera />
                                                        <input
                                                            hidden
                                                            accept="image/*"
                                                            type="file"
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            notched
                                            error={
                                                touched.logo &&
                                                Boolean(errors.logo)
                                            }
                                            helperText={
                                                touched.logo && errors.logo
                                            }
                                            onBlur={handleBlur}
                                        />
                                    </FormControl>
                                    {(touched.logo || Boolean(errors.logo)) && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            style={{ marginLeft: "10px" }}
                                        >
                                            {errors.logo}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    justifyContent="flex-end"
                                    display="flex"
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default ReportForm;
