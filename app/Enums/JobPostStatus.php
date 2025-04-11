<?php

namespace App\Enums;

enum JobPostStatus: int
{
    case PENDING = 1;
    case APPROVED = 2;
    case SPAM = 3;

    public static function labels(): array
    {
        return array_map(fn (JobPostStatus $status) => $status->name, self::cases());
    }

    public static function fromName(string $name)
    {
        return constant("self::$name");
    }
}
