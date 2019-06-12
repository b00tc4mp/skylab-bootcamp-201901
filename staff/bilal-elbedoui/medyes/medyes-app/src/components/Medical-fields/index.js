import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'



export function MedicalFields({ selectCategory }) {

    const selectedField = (event) => {
        const getField = event.target.value
        selectCategory(getField)
    }

    return (

        <div class="control">
            <div class="select">
                <select name="medicalfield" class="is-focused" onChange={selectedField}>
                    <option value="">Select Speciality</option>
                    <option value="Allergology">Allergology</option>
                    <option value="Andrology">Andrology</option>
                    <option value="Anesthesiology">Anesthesiology</option>
                    <option value="Cardiovascular Surgery">Cardiovascular Surgery</option>
                    <option value="Chiropractic Medicine">Chiropractic Medicine</option>
                    <option value="Clinical Analyses">Clinical Analyses</option>
                    <option value="Clinical Biochemistry">Clinical Biochemistry</option>
                    <option value="Clinical Neurophysiology">Clinical Neurophysiology</option>
                    <option value="Clinical Pharmacology">Clinical Pharmacology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Geriatrics">Geriatrics</option>
                    <option value="Hematology and Hemotherapy">Hematology and Hemotherapy</option>
                    <option value="Hepatology">Hepatology</option>
                    <option value="Immunology">Immunology</option>
                    <option value="Intensive Medicine">Intensive Medicine</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Labor Medicine">Labor Medicine</option>
                    <option value="Legal and forensic medicine">Legal and forensic medicine</option>
                    <option value="Medical Hydrology">Medical Hydrology</option>
                    <option value="Medical Oncology">Medical Oncology</option>
                    <option value="Microbiology and Parasitology">Microbiology and Parasitology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Neurosurgery">Neurosurgery</option>
                    <option value="Nuclear Medicine">Nuclear Medicine</option>
                    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                    <option value="Odontology">Odontology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Oral and Maxilofacial Surgery">Oral and Maxilofacial Surgery</option>
                    <option value="Orthopaedic Surgery">Orthopaedic Surgery</option>
                    <option value="Otorhinolaryngology">Otorhinolaryngology</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Pediatric Surgery">Pediatric Surgery</option>
                    <option value="Physical Medicine and Rehabilitation">Physical Medicine and Rehabilitation</option>
                    <option value="Plastic Surgery">Plastic Surgery</option>
                    <option value="Preventive medicine">Preventive medicine</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Radiation Oncology">Radiation Oncology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Rheumatology">Rheumatology</option>
                    <option value="Sports Medicine">Sports Medicine</option>
                    <option value="Thoracic Surgery">Thoracic Surgery</option>
                    <option value="Urology">Urology</option>
                    <option value="Vascular Surgery">Vascular Surgery</option>
                </select>

            </div>
        </div>


    )
}