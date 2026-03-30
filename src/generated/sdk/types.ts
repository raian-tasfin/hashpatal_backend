export default {
    "scalars": [
        1,
        3,
        5,
        6,
        8,
        11,
        23,
        26,
        27,
        28,
        44,
        47
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
                19
            ],
            "complaints": [
                21
            ],
            "diagnosis": [
                24
            ],
            "prescription_items": [
                25
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
        "MyDoctorProfileOutput": {
            "today_appointment_count": [
                11
            ],
            "total_patients": [
                11
            ],
            "completed_consultations": [
                11
            ],
            "today_appointments": [
                4
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
                20
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
                23
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
                26
            ],
            "frequency": [
                27
            ],
            "duration_value": [
                11
            ],
            "duration_unit": [
                28
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
                        30,
                        "FindUserInput!"
                    ]
                }
            ],
            "my_doctor_profile": [
                17
            ],
            "department_fetch_all": [
                18
            ],
            "department_find": [
                18,
                {
                    "data": [
                        31,
                        "FindDepartmentInput!"
                    ]
                }
            ],
            "get_my_appointments": [
                4,
                {
                    "data": [
                        32
                    ]
                }
            ],
            "get_appointments": [
                4,
                {
                    "data": [
                        32,
                        "GetAppointmentsInput!"
                    ]
                }
            ],
            "get_all_complaints": [
                21
            ],
            "get_all_diagnosis": [
                24
            ],
            "get_all_medication": [
                22
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
                        34,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        35,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        36,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                8,
                {
                    "data": [
                        37,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                8,
                {
                    "data": [
                        38,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                8,
                {
                    "data": [
                        39,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                8,
                {
                    "data": [
                        42,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                8,
                {
                    "data": [
                        43,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                8,
                {
                    "data": [
                        45,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "make_appointment": [
                12,
                {
                    "data": [
                        48,
                        "MakeAppointmentInput!"
                    ]
                }
            ],
            "set_appointment_status": [
                8,
                {
                    "data": [
                        49,
                        "SetAppointmentStatusInput!"
                    ]
                }
            ],
            "add_complaint": [
                8,
                {
                    "data": [
                        50,
                        "AddComplaintInput!"
                    ]
                }
            ],
            "add_appointment_complaint": [
                8,
                {
                    "data": [
                        51,
                        "AddAppointmentComplaintInput!"
                    ]
                }
            ],
            "add_appointment_diagnosis": [
                8,
                {
                    "data": [
                        52,
                        "AddAppointmentDiagnosisInput!"
                    ]
                }
            ],
            "add_medication": [
                8,
                {
                    "data": [
                        53,
                        "AddMedicationInput!"
                    ]
                }
            ],
            "add_prescription_item": [
                8,
                {
                    "data": [
                        54,
                        "AddPrescriptionItemInput!"
                    ]
                }
            ],
            "complete_consultation": [
                8,
                {
                    "data": [
                        55,
                        "CompleteConsultationInput!"
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
                40
            ],
            "academic": [
                41
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
                44
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
                44
            ],
            "slots": [
                46
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
                47
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
                23
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
                26
            ],
            "frequency": [
                27
            ],
            "duration_value": [
                11
            ],
            "duration_unit": [
                28
            ],
            "__typename": [
                1
            ]
        },
        "CompleteConsultationInput": {
            "appointment_uuid": [
                1
            ],
            "complaint_uuids": [
                1
            ],
            "diagnosis_uuids": [
                1
            ],
            "prescription_items": [
                56
            ],
            "__typename": [
                1
            ]
        },
        "PrescriptionItemDetailInput": {
            "medication_uuid": [
                1
            ],
            "dose_quantity": [
                26
            ],
            "frequency": [
                27
            ],
            "duration_value": [
                11
            ],
            "duration_unit": [
                28
            ],
            "__typename": [
                1
            ]
        }
    }
}