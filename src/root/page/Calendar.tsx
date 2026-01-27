import React, { useState } from 'react';
import { Calendar } from '@components/shared/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shared/ui/card';
import { Badge } from '@components/shared/ui/badge';

// Sample event data (replace with your scheduleData)
const scheduleData = [
  {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2021, 0, 10, 10, 0),
    EndTime: new Date(2021, 0, 10, 12, 30),
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: 'Conference',
    StartTime: new Date(2021, 0, 11, 9, 0),
    EndTime: new Date(2021, 0, 11, 11, 0),
    CategoryColor: '#357cd2',
  },
  {
    Id: 3,
    Subject: 'Project Review',
    StartTime: new Date(2021, 0, 12, 14, 0),
    EndTime: new Date(2021, 0, 12, 16, 0),
    CategoryColor: '#7fa900',
  },
  {
    Id: 4,
    Subject: 'Team Lunch',
    StartTime: new Date(2021, 0, 13, 12, 0),
    EndTime: new Date(2021, 0, 13, 13, 0),
    CategoryColor: '#ea7a57',
  },
  {
    Id: 5,
    Subject: 'Client Call',
    StartTime: new Date(2021, 0, 14, 15, 0),
    EndTime: new Date(2021, 0, 14, 16, 30),
    CategoryColor: '#00bdae',
  },
];

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 0, 10));

  // Get events for selected date
  const getEventsForDate = (date) => {
    return scheduleData.filter((event) => {
      const eventDate = new Date(event.StartTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get dates that have events
  const getDatesWithEvents = () => {
    return scheduleData.map((event) => new Date(event.StartTime));
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const datesWithEvents = getDatesWithEvents();

  // Format time
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg  rounded-3xl">
      <h3 className="text-3xl font-extrabold tracking-tight mb-8">Calendar</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: datesWithEvents,
              }}
              modifiersStyles={{
                hasEvents: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Events for{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <div
                    key={event.Id}
                    className="p-4 rounded-lg border-l-4"
                    style={{ borderLeftColor: event.CategoryColor }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          {event.Subject}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatTime(event.StartTime)} -{' '}
                          {formatTime(event.EndTime)}
                        </p>
                      </div>
                      <Badge
                        style={{ backgroundColor: event.CategoryColor }}
                        className="text-white"
                      >
                        Event
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No events scheduled for this date
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Events List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleData
              .sort((a, b) => a.StartTime - b.StartTime)
              .map((event) => (
                <div
                  key={event.Id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.CategoryColor }}
                    />
                    <div>
                      <p className="font-medium">{event.Subject}</p>
                      <p className="text-sm text-gray-600">
                        {event.StartTime.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        • {formatTime(event.StartTime)} -{' '}
                        {formatTime(event.EndTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scheduler;
