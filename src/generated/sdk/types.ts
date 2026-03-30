export default {
    "scalars": [
        1,
        3,
        9,
        10,
        12,
        16,
        20,
        23,
        24,
        25,
        41,
        44
    ],
    "types": {
        "TokenPair": {
            "accessToken": [
                1
            ],
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "UserOutput": {
            "uuid": [
                1
            ],
            "email": [
                1
            ],
            "birthDate": [
                1
            ],
            "user_roles": [
                3
            ],
            "doctor_profile": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "RoleType": {},
        "DoctorProfileOutput": {
            "doctor_name": [
                1
            ],
            "experience": [
                5
            ],
            "academic_record": [
                6
            ],
            "schedule": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "DoctorExperienceOutput": {
            "startYear": [
                1
            ],
            "endYear": [
                1
            ],
            "location": [
                1
            ],
            "organization": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AcademicRecordOutput": {
            "degree": [
                1
            ],
            "institute": [
                1
            ],
            "year": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DepartmentOutput": {
            "uuid": [
                1
            ],
            "name": [
                1
            ],
            "doctors": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "AppointmentOutput": {
            "uuid": [
                1
            ],
            "date": [
                1
            ],
            "shift": [
                9
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "status": [
                10
            ],
            "patient": [
                15
            ],
            "complaints": [
                18
            ],
            "diagnosis": [
                21
            ],
            "prescription_items": [
                22
            ],
            "__typename": [
                1
            ]
        },
        "ShiftType": {},
        "AppointmentStatusType": {},
        "AvailableShiftOutput": {
            "date": [
                1
            ],
            "shift": [
                9
            ],
            "status": [
                12
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "AvailableSlotOutput": {
            "shift": [
                9
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ScheduleOutput": {
            "uuid": [
                1
            ],
            "available_slots": [
                13,
                {
                    "date": [
                        1,
                        "String!"
                    ]
                }
            ],
            "available_shifts": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "PatientOutput": {
            "name": [
                1
            ],
            "uuid": [
                1
            ],
            "birthDate": [
                1
            ],
            "age": [
                16
            ],
            "previous_appointments": [
                17
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "PreviousAppointmentOutput": {
            "uuid": [
                1
            ],
            "date": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ComplaintOutput": {
            "uuid": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MedicationOutput": {
            "uuid": [
                1
            ],
            "name": [
                1
            ],
            "generic_name": [
                1
            ],
            "dose_unit": [
                1
            ],
            "food_relation": [
                20
            ],
            "__typename": [
                1
            ]
        },
        "FoodRelationType": {},
        "DiagnosisOutput": {
            "uuid": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PrescriptionItemOutput": {
            "medication_uuid": [
                1
            ],
            "medication_name": [
                1
            ],
            "dose_quantity": [
                23
            ],
            "frequency": [
                24
            ],
            "duration_value": [
                16
            ],
            "duration_unit": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "MedicationFrequencyType": {},
        "DurationUnitType": {},
        "Query": {
            "sayHello": [
                1
            ],
            "user_find": [
                2,
                {
                    "data": [
                        27,
                        "FindUserInput!"
                    ]
                }
            ],
            "department_fetch_all": [
                7
            ],
            "department_find": [
                7,
                {
                    "data": [
                        28,
                        "FindDepartmentInput!"
                    ]
                }
            ],
            "get_appointments": [
                8,
                {
                    "data": [
                        29,
                        "GetAppointmentsInput!"
                    ]
                }
            ],
            "get_all_complaints": [
                18
            ],
            "get_all_diagnosis": [
                21
            ],
            "get_all_medication": [
                19
            ],
            "__typename": [
                1
            ]
        },
        "FindUserInput": {
            "email": [
                1
            ],
            "uuid": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FindDepartmentInput": {
            "uuid": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GetAppointmentsInput": {
            "scheduleUuid": [
                1
            ],
            "patientUuid": [
                1
            ],
            "status": [
                10
            ],
            "date": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "user_register": [
                2,
                {
                    "data": [
                        31,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        32,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        33,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                12,
                {
                    "data": [
                        34,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                12,
                {
                    "data": [
                        35,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                12,
                {
                    "data": [
                        36,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                12,
                {
                    "data": [
                        39,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                12,
                {
                    "data": [
                        40,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                12,
                {
                    "data": [
                        42,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "set_appointment_status": [
                12,
                {
                    "data": [
                        45,
                        "SetAppointmentStatusInput!"
                    ]
                }
            ],
            "add_complaint": [
                12,
                {
                    "data": [
                        46,
                        "AddComplaintInput!"
                    ]
                }
            ],
            "add_appointment_complaint": [
                12,
                {
                    "data": [
                        47,
                        "AddAppointmentComplaintInput!"
                    ]
                }
            ],
            "add_appointment_diagnosis": [
                12,
                {
                    "data": [
                        48,
                        "AddAppointmentDiagnosisInput!"
                    ]
                }
            ],
            "add_medication": [
                12,
                {
                    "data": [
                        49,
                        "AddMedicationInput!"
                    ]
                }
            ],
            "add_prescription_item": [
                12,
                {
                    "data": [
                        50,
                        "AddPrescriptionItemInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "RegisterInput": {
            "email": [
                1
            ],
            "name": [
                1
            ],
            "password": [
                1
            ],
            "birthDate": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LoginInput": {
            "email": [
                1
            ],
            "password": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RefreshLoginInput": {
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LogoutInput": {
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SyncRolesInput": {
            "uuid": [
                1
            ],
            "roles": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "SyncProfileInput": {
            "uuid": [
                1
            ],
            "departmentUuid": [
                1
            ],
            "experience": [
                37
            ],
            "academic": [
                38
            ],
            "__typename": [
                1
            ]
        },
        "ExperienceInput": {
            "title": [
                1
            ],
            "organization": [
                1
            ],
            "location": [
                1
            ],
            "startYear": [
                1
            ],
            "endYear": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AcademicRecordInput": {
            "degree": [
                1
            ],
            "institute": [
                1
            ],
            "year": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddDepartmentInput": {
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ScheduleSyncInput": {
            "entityUuid": [
                1
            ],
            "schedulable": [
                41
            ],
            "minutes_per_slot": [
                16
            ],
            "max_booking_days": [
                16
            ],
            "__typename": [
                1
            ]
        },
        "SchedulableType": {},
        "RoutineSyncInput": {
            "entityUuid": [
                1
            ],
            "schedulable": [
                41
            ],
            "slots": [
                43
            ],
            "__typename": [
                1
            ]
        },
        "RoutineSlotInput": {
            "shift": [
                9
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "weekDay": [
                44
            ],
            "__typename": [
                1
            ]
        },
        "WeekDayType": {},
        "SetAppointmentStatusInput": {
            "uuid": [
                1
            ],
            "status": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "AddComplaintInput": {
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddAppointmentComplaintInput": {
            "appointment_uuid": [
                1
            ],
            "complaint_uuid": [
                1
            ],
            "note": [
                1
            ],
            "days": [
                16
            ],
            "__typename": [
                1
            ]
        },
        "AddAppointmentDiagnosisInput": {
            "appointment_uuid": [
                1
            ],
            "diagnosis_uuid": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddMedicationInput": {
            "name": [
                1
            ],
            "generic_name": [
                1
            ],
            "dose_unit": [
                1
            ],
            "food_relation": [
                20
            ],
            "__typename": [
                1
            ]
        },
        "AddPrescriptionItemInput": {
            "appointment_uuid": [
                1
            ],
            "medication_uuid": [
                1
            ],
            "dose_quantity": [
                23
            ],
            "frequency": [
                24
            ],
            "duration_value": [
                16
            ],
            "duration_unit": [
                25
            ],
            "__typename": [
                1
            ]
        }
    }
}