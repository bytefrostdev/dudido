# Changelog

All notable changes to dudido will be documented in this file.

This project is a fork of [tududi](https://github.com/chrisvel/tududi). This changelog only documents dudido-specific additions and modifications.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

*Nothing yet*

---

## [0.1.0] - 2025-12-19

First dudido release, based on tududi v0.88.1.

### Added

#### iCal Calendar Feed
Subscribe to your tasks in external calendar apps (Apple Calendar, Google Calendar, Outlook, etc.).

**New user settings (Profile → Calendar tab):**
- **Enable Calendar** - Shows/hides the Calendar section in the main navigation sidebar
- **Enable iCal Feed** - Activates the calendar subscription feature with a unique, secure token

**Feed includes:**
- All tasks with due dates (excluding completed tasks by default)
- Task title, description, and notes
- Project name (prefixed in description)
- Recurring task patterns (RRULE support for daily, weekly, monthly, yearly)
- Created/updated timestamps

**Feed URL parameters:**
- `?token=ical_xxx` (required) - Authentication token
- `?completed=true` (optional) - Include completed tasks
- `?project=123` (optional) - Filter by specific project ID

**Security:**
- Dedicated token system (separate from API keys)
- Token format: `ical_` prefix + 32 random hex characters
- Users can regenerate tokens at any time
- Disabling the feed immediately revokes the token

**Migration required:**
```bash
npx sequelize-cli db:migrate
```

**Note:** The `FEATURE_CALENDAR` environment variable in docker-compose.yml is no longer needed. Calendar visibility is now user-controlled.

---

## Base Version

dudido is forked from [tududi v0.88.1](https://github.com/chrisvel/tududi/releases/tag/v0.88.1).
