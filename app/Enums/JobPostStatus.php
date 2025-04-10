<?php

namespace App\Enums;

enum JobPostStatus: int
{
    case PENDING = 1;
    case APPROVED = 2;
    case SPAM = 3;
}
