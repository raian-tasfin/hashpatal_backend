export default {
    "scalars": [
        1,
        3,
        9,
        14,
        25,
        28,
        29
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
                8
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
        "ScheduleOutput": {
            "minutesPerSlot": [
                9
            ],
            "maxBookingDays": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "Query": {
            "sayHello": [
                1
            ],
            "user_find": [
                2,
                {
                    "data": [
                        11,
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
                        12,
                        "FindDepartmentInput!"
                    ]
                }
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
        "Mutation": {
            "user_register": [
                2,
                {
                    "data": [
                        15,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        16,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        17,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                14,
                {
                    "data": [
                        18,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                14,
                {
                    "data": [
                        19,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                14,
                {
                    "data": [
                        20,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                14,
                {
                    "data": [
                        23,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                14,
                {
                    "data": [
                        24,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                14,
                {
                    "data": [
                        26,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
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
                21
            ],
            "academic": [
                22
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
                25
            ],
            "minutes_per_slot": [
                9
            ],
            "max_booking_days": [
                9
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
                25
            ],
            "slots": [
                27
            ],
            "__typename": [
                1
            ]
        },
        "RoutineSlotInput": {
            "shift": [
                28
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "weekDay": [
                29
            ],
            "__typename": [
                1
            ]
        },
        "ShiftType": {},
        "WeekDayType": {}
    }
}