export default {
    "scalars": [
        1,
        3,
        9,
        11,
        13,
        17
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
                12
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
        "BlockedDayOutput": {
            "date": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "OverrideRoutineOutput": {
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
            "__typename": [
                1
            ]
        },
        "ShiftType": {},
        "RegularRoutineOutput": {
            "weekDay": [
                11
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
            "__typename": [
                1
            ]
        },
        "WeekDayType": {},
        "ScheduleOutput": {
            "minutesPerSlot": [
                13
            ],
            "maxBookingDays": [
                13
            ],
            "regular_routine": [
                10
            ],
            "override_routine": [
                8
            ],
            "blocked_days": [
                7
            ],
            "available_slots": [
                8
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
                        15,
                        "FindByEmailInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "FindByEmailInput": {
            "email": [
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
                        18,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        19,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        20,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                17,
                {
                    "data": [
                        21,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                17,
                {
                    "data": [
                        22,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                17
            ],
            "doctor_schedule_sync": [
                17,
                {
                    "data": [
                        23,
                        "DoctorScheduleSyncInput!"
                    ]
                }
            ],
            "doctor_schedule_regular_slots_sync": [
                17,
                {
                    "data": [
                        24,
                        "DoctorRegularRoutineSyncInput!"
                    ]
                }
            ],
            "doctor_schedule_override_slots_sync": [
                17,
                {
                    "data": [
                        26,
                        "DoctorOverrideRoutineSyncInput!"
                    ]
                }
            ],
            "doctor_blocked_days_add": [
                17,
                {
                    "data": [
                        28,
                        "DoctorBlockedDaysAddInput!"
                    ]
                }
            ],
            "doctor_blocked_days_remove": [
                17,
                {
                    "data": [
                        29,
                        "DoctorBlockedDaysRemoveInput!"
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
            "email": [
                1
            ],
            "roles": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DoctorScheduleSyncInput": {
            "email": [
                1
            ],
            "minutesPerSlot": [
                13
            ],
            "maxBookingDays": [
                13
            ],
            "__typename": [
                1
            ]
        },
        "DoctorRegularRoutineSyncInput": {
            "email": [
                1
            ],
            "slots": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "RegularSlotInput": {
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
                11
            ],
            "__typename": [
                1
            ]
        },
        "DoctorOverrideRoutineSyncInput": {
            "email": [
                1
            ],
            "slots": [
                27
            ],
            "__typename": [
                1
            ]
        },
        "OverrideSlotInput": {
            "shift": [
                9
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "date": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DoctorBlockedDaysAddInput": {
            "email": [
                1
            ],
            "dates": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DoctorBlockedDaysRemoveInput": {
            "email": [
                1
            ],
            "dates": [
                1
            ],
            "__typename": [
                1
            ]
        }
    }
}