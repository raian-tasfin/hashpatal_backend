export default {
    "scalars": [
        1,
        3,
        9,
        10,
        12,
        15,
        35,
        38
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
                16
            ],
            "complaints": [
                18
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
            "minutes_per_slot": [
                15
            ],
            "max_booking_days": [
                15
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
        "Int": {},
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
                15
            ],
            "previous_appointments": [
                17
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
        "Query": {
            "sayHello": [
                1
            ],
            "user_find": [
                2,
                {
                    "data": [
                        21,
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
                        22,
                        "FindDepartmentInput!"
                    ]
                }
            ],
            "get_appointments": [
                8,
                {
                    "data": [
                        23,
                        "GetAppointmentsInput!"
                    ]
                }
            ],
            "get_all_complaints": [
                18
            ],
            "get_all_diagnosis": [
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
                        25,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        26,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        27,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                12,
                {
                    "data": [
                        28,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                12,
                {
                    "data": [
                        29,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                12,
                {
                    "data": [
                        30,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                12,
                {
                    "data": [
                        33,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                12,
                {
                    "data": [
                        34,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                12,
                {
                    "data": [
                        36,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "add_complaint": [
                12,
                {
                    "data": [
                        39,
                        "AddComplaintInput!"
                    ]
                }
            ],
            "add_appointment_complaint": [
                12,
                {
                    "data": [
                        40,
                        "AddAppointmentComplaintInput!"
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
                31
            ],
            "academic": [
                32
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
                35
            ],
            "minutes_per_slot": [
                15
            ],
            "max_booking_days": [
                15
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
                35
            ],
            "slots": [
                37
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
                38
            ],
            "__typename": [
                1
            ]
        },
        "WeekDayType": {},
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
                15
            ],
            "__typename": [
                1
            ]
        }
    }
}