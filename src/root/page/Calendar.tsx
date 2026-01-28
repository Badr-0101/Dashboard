import { useState } from 'react';
import { Calendar } from '@components/shared/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shared/ui/card';
import { Badge } from '@components/shared/ui/badge';

import { scheduleData } from '@data/dummy';

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2025, 0, 20),
  );

  const getEventsForDate = (date?: Date) => {
    if (!date) return [];
    return scheduleData.filter((event) => {
      const d = event.StartTime;
      return (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    });
  };

  const getDatesWithEvents = () => {
    return scheduleData.map((event) => event.StartTime);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const datesWithEvents = getDatesWithEvents();

  if (!selectedDate) return null;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <h3 className="text-3xl font-extrabold tracking-tight mb-8">Calendar</h3>

      <div className="grid md:grid-cols-2 gap-6">
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
              modifiers={{ hasEvents: datesWithEvents }}
              modifiersStyles={{
                hasEvents: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                },
              }}
            />
          </CardContent>
        </Card>

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
                      <div>
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleData
              .slice()
              .sort((a, b) => a.StartTime.getTime() - b.StartTime.getTime())
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
