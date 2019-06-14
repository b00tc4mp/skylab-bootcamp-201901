import React, { useState } from 'react';
import { Link } from 'react-router-dom'


export function FieldsToPost({onSelect}){

    const handleSelectField = (event) => {
        debugger
        const {
            medicalfield: { value: medicalfield }
        } = event.target
        debugger
        onSelect(medicalfield)
    }

    return (

        <div class="control">
            <div class="select">
                <select name="medicalfield" class="is-focused" onSelect={handleSelectField}>
                    <option value="">Select Speciality</option>
                    <option value="5cfe43a653cfaa49149d9f30">Allergology</option>
                    <option value="5cfe43b053cfaa49149d9f31">Andrology</option>
                    <option value="5cfe43b753cfaa49149d9f32">Anesthesiology</option>
                    <option value="5cfe43be53cfaa49149d9f33">Cardiology</option>
                    <option value="5cfe43c853cfaa49149d9f34">Cardiovascular Surgery</option>
                    <option value="5cfe43d253cfaa49149d9f35">Chiropractic Medicine</option>
                    <option value="5cfe43df53cfaa49149d9f36">Clinical Analyses</option>
                    <option value="5cfe43e753cfaa49149d9f37">Clinical Biochemistry</option>
                    <option value="5cfe43f153cfaa49149d9f38">Clinical Neurophysiology</option>
                    <option value="5cfe43f853cfaa49149d9f39">Clinical Pharmacology</option>
                    <option value="5cfe43ff53cfaa49149d9f3a">Dermatology</option>
                    <option value="5cfe440653cfaa49149d9f3b">Emergency Medicine</option>
                    <option value="5cfe440e53cfaa49149d9f3c">Endocrinology</option>
                    <option value="5cfe441753cfaa49149d9f3d">Gastroenterology</option>
                    <option value="5cfe441d53cfaa49149d9f3e">General Surgery</option>
                    <option value="5cfe442353cfaa49149d9f3f">Geriatrics</option>
                    <option value="5cfe442b53cfaa49149d9f40">Hematology and Hemotherapy</option>
                    <option value="5cfe443353cfaa49149d9f41">Hepatology</option>
                    <option value="5cfe443953cfaa49149d9f42">Immunology</option>
                    <option value="5cfe443953cfaa49149d9f43">Intensive Medicine</option>
                    <option value="5cfe446353cfaa49149d9f44">Internal Medicine</option>
                    <option value="5cfe446b53cfaa49149d9f45">Labor Medicine</option>
                    <option value="5cfe447553cfaa49149d9f46">Legal and forensic medicine</option>
                    <option value="5cfe447e53cfaa49149d9f47">Medical Hydrology</option>
                    <option value="5cfe449c53cfaa49149d9f48">Medical Oncology</option>
                    <option value="5cfe44a453cfaa49149d9f49">Microbiology and Parasitology</option>
                    <option value="5cfe44ac53cfaa49149d9f4a">Nephrology</option>
                    <option value="5cfe44b253cfaa49149d9f4b">Neurology</option>
                    <option value="5cfe44ba53cfaa49149d9f4c">Neurosurgery</option>
                    <option value="5cfe44c753cfaa49149d9f4d">Nuclear Medicine</option>
                    <option value="5cfe44d453cfaa49149d9f4e">Obstetrics and Gynecology</option>
                    <option value="5cfe44dc53cfaa49149d9f4f">Odontology</option>
                    <option value="5cfe44e453cfaa49149d9f50">Ophthalmology</option>
                    <option value="5cfe44ed53cfaa49149d9f51">Oral and Maxilofacial Surgery</option>
                    <option value="5cfe44f653cfaa49149d9f52">Orthopaedic Surgery</option>
                    <option value="5cfe44ff53cfaa49149d9f54">Otorhinolaryngology</option>
                    <option value="5cfe450753cfaa49149d9f55">Pathology</option>
                    <option value="5cfe452353cfaa49149d9f56">Pediatric Surgery</option>
                    <option value="5cfe452b53cfaa49149d9f58">Physical Medicine and Rehabilitation</option>
                    <option value="5cfe455653cfaa49149d9f59">Plastic Surgery</option>
                    <option value="5cfe456153cfaa49149d9f5a">Preventive medicine</option>
                    <option value="5cfe458a53cfaa49149d9f5b">Psychiatry</option>
                    <option value="5cfe459253cfaa49149d9f5c">Pulmonology</option>
                    <option value="5cfe459c53cfaa49149d9f5d">Radiation Oncology</option>
                    <option value="5cfe45a353cfaa49149d9f5e">Radiology</option>
                    <option value="5cfe45b153cfaa49149d9f5f">Rheumatology</option>
                    <option value="5cfe45bd53cfaa49149d9f60">Sports Medicine</option>
                    <option value="5cfe45c553cfaa49149d9f61">Thoracic Surgery</option>
                    <option value="5cfe45d753cfaa49149d9f62">Urology</option>
                    <option value="5cfe45e053cfaa49149d9f63">Vascular Surgery</option>
                </select>

            </div>
        </div>


    )
}