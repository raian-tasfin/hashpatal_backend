export default {
    "scalars": [
        1,
        3,
        5,
        6,
        8,
        11,
        22,
        25,
        26,
        27,
        43,
        46
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
            "name": [
                1
            ],
            "user_roles": [
                3
            ],
            "doctor_profile": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "RoleType": {},
        "AppointmentOutput": {
            "uuid": [
                1
            ],
            "date": [
                1
            ],
            "shift": [
                5
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "status": [
                6
            ],
            "patient": [
                18
            ],
            "complaints": [
                20
            ],
            "diagnosis": [
                23
            ],
            "prescription_items": [
                24
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
                5
            ],
            "status": [
                8
            ],
            "start_time": [
                1
            ],
            "end_time": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "AvailableSlotOutput": {
            "shift": [
                5
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
            "max_booking_days": [
                11
            ],
            "available_slots": [
                9,
                {
                    "date": [
                        1,
                        "String!"
                    ]
                }
            ],
            "available_shifts": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "MakeAppointmentOutput": {
            "date": [
                1
            ],
            "start_time": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MeOutput": {
            "user": [
                2
            ],
            "upcoming_appointments": [
                11
            ],
            "past_visits": [
                11
            ],
            "upcoming_appointment_list": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "DoctorProfileOutput": {
            "doctor_name": [
                1
            ],
            "experience": [
                15
            ],
            "academic_record": [
                16
            ],
            "schedule": [
                10
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
                11
            ],
            "previous_appointments": [
                19
            ],
            "__typename": [
                1
            ]
        },
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
                22
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
                25
            ],
            "frequency": [
                26
            ],
            "duration_value": [
                11
            ],
            "duration_unit": [
                27
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
            "me": [
                13
            ],
            "user_find": [
                2,
                {
                    "data": [
                        29,
                        "FindUserInput!"
                    ]
                }
            ],
            "department_fetch_all": [
                17
            ],
            "department_find": [
                17,
                {
                    "data": [
                        30,
                        "FindDepartmentInput!"
                    ]
                }
            ],
            "get_my_appointments": [
                4,
                {
                    "data": [
                        31
                    ]
                }
            ],
            "get_appointments": [
                4,
                {
                    "data": [
                        31,
                        "GetAppointmentsInput!"
                    ]
                }
            ],
            "get_all_complaints": [
                20
            ],
            "get_all_diagnosis": [
                23
            ],
            "get_all_medication": [
                21
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
                6
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
                        33,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        34,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        35,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                8,
                {
                    "data": [
                        36,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                8,
                {
                    "data": [
                        37,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                8,
                {
                    "data": [
                        38,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                8,
                {
                    "data": [
                        41,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                8,
                {
                    "data": [
                        42,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                8,
                {
                    "data": [
                        44,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "make_appointment": [
                12,
                {
                    "data": [
                        47,
                        "MakeAppointmentInput!"
                    ]
                }
            ],
            "set_appointment_status": [
                8,
                {
                    "data": [
                        48,
                        "SetAppointmentStatusInput!"
                    ]
                }
            ],
            "add_complaint": [
                8,
                {
                    "data": [
                        49,
                        "AddComplaintInput!"
                    ]
                }
            ],
            "add_appointment_complaint": [
                8,
                {
                    "data": [
                        50,
                        "AddAppointmentComplaintInput!"
                    ]
                }
            ],
            "add_appointment_diagnosis": [
                8,
                {
                    "data": [
                        51,
                        "AddAppointmentDiagnosisInput!"
                    ]
                }
            ],
            "add_medication": [
                8,
                {
                    "data": [
                        52,
                        "AddMedicationInput!"
                    ]
                }
            ],
            "add_prescription_item": [
                8,
                {
                    "data": [
                        53,
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
                39
            ],
            "academic": [
                40
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
                43
            ],
            "minutes_per_slot": [
                11
            ],
            "max_booking_days": [
                11
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
                43
            ],
            "slots": [
                45
            ],
            "__typename": [
                1
            ]
        },
        "RoutineSlotInput": {
            "shift": [
                5
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "weekDay": [
                46
            ],
            "__typename": [
                1
            ]
        },
        "WeekDayType": {},
        "MakeAppointmentInput": {
            "scheduleUuid": [
                1
            ],
            "date": [
                1
            ],
            "shift": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "SetAppointmentStatusInput": {
            "uuid": [
                1
            ],
            "status": [
                6
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
                11
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
                22
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
                25
            ],
            "frequency": [
                26
            ],
            "duration_value": [
                11
            ],
            "duration_unit": [
                27
            ],
            "__typename": [
                1
            ]
        }
    }
}