import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Demo students
  const students = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: hashedPassword,
        role: 'student',
        studentProfile: {
          create: {
            level: 'beginner',
            xp: 1250,
            streak: 7,
            totalPracticeMinutes: 180,
            guitarType: 'acoustic',
            experienceLevel: 'beginner',
            learningGoal: 'Play songs',
            practiceGoal: 20,
            completedOnboarding: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sam Williams',
        email: 'sam@example.com',
        password: hashedPassword,
        role: 'student',
        studentProfile: {
          create: {
            level: 'beginner',
            xp: 890,
            streak: 3,
            totalPracticeMinutes: 120,
            guitarType: 'electric',
            experienceLevel: 'little',
            learningGoal: 'Learn chords',
            practiceGoal: 15,
            completedOnboarding: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'student',
        studentProfile: {
          create: {
            level: 'beginner',
            xp: 2100,
            streak: 14,
            totalPracticeMinutes: 320,
            guitarType: 'acoustic',
            experienceLevel: 'intermediate',
            learningGoal: 'Improve rhythm',
            practiceGoal: 30,
            completedOnboarding: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Emma Davis',
        email: 'emma@example.com',
        password: hashedPassword,
        role: 'student',
        studentProfile: {
          create: {
            level: 'beginner',
            xp: 560,
            streak: 1,
            totalPracticeMinutes: 45,
            guitarType: 'classical',
            experienceLevel: 'never',
            learningGoal: 'Learn fingerstyle',
            practiceGoal: 10,
            completedOnboarding: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Mike Brown',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'student',
        studentProfile: {
          create: {
            level: 'beginner',
            xp: 1780,
            streak: 5,
            totalPracticeMinutes: 240,
            guitarType: 'electric',
            experienceLevel: 'beginner',
            learningGoal: 'Learn lead guitar',
            practiceGoal: 25,
            completedOnboarding: true,
          },
        },
      },
    }),
  ]);

  // Demo teachers
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Sarah Guitar',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'teacher',
        teacherProfile: {
          create: {
            bio: 'Passionate guitar instructor with 8 years of experience teaching beginners to advanced players.',
            experience: '8 years',
            specialization: 'Beginner Guitar, Fingerstyle, Music Theory',
            studentCount: 24,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'David Music',
        email: 'david@example.com',
        password: hashedPassword,
        role: 'teacher',
        teacherProfile: {
          create: {
            bio: 'Professional guitarist specializing in electric guitar and rock music.',
            experience: '12 years',
            specialization: 'Electric Guitar, Rock, Blues',
            studentCount: 18,
          },
        },
      },
    }),
  ]);

  // Create beginner course
  const course = await prisma.course.create({
    data: {
      title: 'Beginner Guitar',
      description: 'Learn guitar from absolute beginner through your first songs.',
      level: 'beginner',
      thumbnail: '',
      published: true,
    },
  });

  // Create 16 beginner lessons
  const lessonData = [
    { title: 'Meet Your Guitar', description: 'Introduction to your instrument', order: 1, duration: 5 },
    { title: 'Guitar Parts', description: 'Learn the different parts of your guitar', order: 2, duration: 8 },
    { title: 'How to Hold the Guitar', description: 'Proper posture and positioning', order: 3, duration: 6 },
    { title: 'Using a Guitar Pick', description: 'Pick holding and technique', order: 4, duration: 7 },
    { title: 'Understanding Guitar Strings', description: 'String names and numbers', order: 5, duration: 5 },
    { title: 'Tune Your Guitar', description: 'Standard tuning basics', order: 6, duration: 10 },
    { title: 'Playing Your First Note', description: 'Finger placement and picking', order: 7, duration: 8 },
    { title: 'Your First Chord — Em', description: 'Learn the E minor chord', order: 8, duration: 12 },
    { title: 'A Minor', description: 'Learn the A minor chord', order: 9, duration: 10 },
    { title: 'C Major', description: 'Learn the C major chord', order: 10, duration: 12 },
    { title: 'G Major', description: 'Learn the G major chord', order: 11, duration: 12 },
    { title: 'D Major', description: 'Learn the D major chord', order: 12, duration: 10 },
    { title: 'Chord Switching', description: 'Practice switching between chords', order: 13, duration: 15 },
    { title: 'Basic Downstroke', description: 'Downstroke strumming technique', order: 14, duration: 10 },
    { title: 'Down-Up Strumming', description: 'Alternate strumming patterns', order: 15, duration: 12 },
    { title: 'Your First Song', description: 'Put it all together in a song', order: 16, duration: 20 },
  ];

  const lessons = await Promise.all(
    lessonData.map((lesson) =>
      prisma.lesson.create({
        data: {
          courseId: course.id,
          title: lesson.title,
          description: lesson.description,
          content: `Learn ${lesson.title.toLowerCase()} in this comprehensive lesson.`,
          videoUrl: '',
          order: lesson.order,
          duration: lesson.duration,
          published: true,
        },
      })
    )
  );

  // Create demo classes
  const class1 = await prisma.class.create({
    data: {
      teacherId: teachers[0].id,
      name: 'Beginner Guitar — Batch A',
      description: 'Complete beginner guitar class',
      schedule: 'Mon, Wed, Fri 6PM',
    },
  });

  const class2 = await prisma.class.create({
    data: {
      teacherId: teachers[1].id,
      name: 'Electric Guitar Basics',
      description: 'Introduction to electric guitar',
      schedule: 'Tue, Thu 7PM',
    },
  });

  // Add students to classes
  await Promise.all([
    prisma.classMember.create({
      data: { classId: class1.id, studentId: students[0].studentProfile!.id },
    }),
    prisma.classMember.create({
      data: { classId: class1.id, studentId: students[1].studentProfile!.id },
    }),
    prisma.classMember.create({
      data: { classId: class1.id, studentId: students[2].studentProfile!.id },
    }),
    prisma.classMember.create({
      data: { classId: class2.id, studentId: students[3].studentProfile!.id },
    }),
    prisma.classMember.create({
      data: { classId: class2.id, studentId: students[4].studentProfile!.id },
    }),
  ]);

  // Create demo assignments
  await Promise.all([
    prisma.assignment.create({
      data: {
        teacherId: teachers[0].id,
        classId: class1.id,
        title: 'Practice C → G Switching',
        description: 'Practice switching between C and G chords for 10 minutes per day.',
        exerciseId: lessons[9].id,
        targetAccuracy: 80,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.assignment.create({
      data: {
        teacherId: teachers[0].id,
        classId: class1.id,
        title: 'Em Chord Mastery',
        description: 'Achieve 90% accuracy on Em chord practice.',
        exerciseId: lessons[7].id,
        targetAccuracy: 90,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.assignment.create({
      data: {
        teacherId: teachers[1].id,
        classId: class2.id,
        title: 'Strumming Pattern Practice',
        description: 'Practice down-up strumming at 60 BPM.',
        exerciseId: lessons[14].id,
        targetAccuracy: 85,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  // Create demo practice sessions
  await Promise.all([
    prisma.practiceSession.create({
      data: {
        studentId: students[0].studentProfile!.id,
        lessonId: lessons[7].id,
        exerciseId: lessons[7].id,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
        duration: 600,
        accuracy: 92,
        pitchScore: 94,
        timingScore: 88,
        rhythmScore: 90,
        chordScore: 95,
        overallScore: 92,
        detectedNotes: ['E', 'B', 'G', 'D'],
        expectedNotes: ['E', 'B', 'G', 'D'],
        detectedChord: 'Em',
        expectedChord: 'Em',
        confidence: 0.94,
      },
    }),
    prisma.practiceSession.create({
      data: {
        studentId: students[1].studentProfile!.id,
        lessonId: lessons[8].id,
        exerciseId: lessons[8].id,
        startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000),
        duration: 480,
        accuracy: 78,
        pitchScore: 82,
        timingScore: 75,
        rhythmScore: 76,
        chordScore: 80,
        overallScore: 78,
        detectedNotes: ['A', 'E', 'C'],
        expectedNotes: ['A', 'E', 'C'],
        detectedChord: 'Am',
        expectedChord: 'Am',
        confidence: 0.82,
      },
    }),
  ]);

  // Create demo teacher feedback
  await prisma.teacherFeedback.create({
    data: {
      teacherId: teachers[0].id,
      studentId: students[0].studentProfile!.id,
      comment: 'Your chord placement is improving. Focus on switching between C and G.',
    },
  });

  // Create demo achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'First Chord',
        description: 'Learn your first chord',
        icon: '🎸',
        xpReward: 50,
        requirement: 'Complete first chord lesson',
      },
    }),
    prisma.achievement.create({
      data: {
        name: '7 Day Streak',
        description: 'Practice for 7 consecutive days',
        icon: '🔥',
        xpReward: 100,
        requirement: '7 day practice streak',
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'First Song',
        description: 'Complete your first song',
        icon: '🎵',
        xpReward: 200,
        requirement: 'Complete first song lesson',
      },
    }),
    prisma.achievement.create({
      data: {
        name: '100 Practice Minutes',
        description: 'Practice for 100 total minutes',
        icon: '⏱️',
        xpReward: 150,
        requirement: '100 minutes total practice',
      },
    }),
  ]);

  // Award some achievements to students
  await Promise.all([
    prisma.studentAchievement.create({
      data: {
        studentId: students[0].studentProfile!.id,
        achievementId: achievements[0].id,
      },
    }),
    prisma.studentAchievement.create({
      data: {
        studentId: students[0].studentProfile!.id,
        achievementId: achievements[1].id,
      },
    }),
    prisma.studentAchievement.create({
      data: {
        studentId: students[2].studentProfile!.id,
        achievementId: achievements[1].id,
      },
    }),
  ]);

  // Create demo chords
  const chords = [
    { name: 'C', variation: 'Major', strings: ['X', '3', '2', '0', '1', '0'], frets: [[], [3], [2], [0], [1], [0]], fingers: [[], [3], [2], [0], [1], [0]], notes: ['C', 'E', 'G'], difficulty: 'beginner' as const },
    { name: 'G', variation: 'Major', strings: ['3', '2', '0', '0', '0', '3'], frets: [[3], [2], [0], [0], [0], [3]], fingers: [[3], [2], [0], [0], [0], [3]], notes: ['G', 'B', 'D'], difficulty: 'beginner' as const },
    { name: 'D', variation: 'Major', strings: ['X', 'X', '0', '2', '3', '2'], frets: [[], [], [0], [2], [3], [2]], fingers: [[], [], [0], [1], [3], [2]], notes: ['D', 'F#', 'A'], difficulty: 'beginner' as const },
    { name: 'Em', variation: 'Minor', strings: ['0', '2', '2', '0', '0', '0'], frets: [[0], [2], [2], [0], [0], [0]], fingers: [[0], [2], [3], [0], [0], [0]], notes: ['E', 'G', 'B'], difficulty: 'beginner' as const },
    { name: 'Am', variation: 'Minor', strings: ['X', '0', '2', '2', '1', '0'], frets: [[], [0], [2], [2], [1], [0]], fingers: [[], [0], [2], [3], [1], [0]], notes: ['A', 'C', 'E'], difficulty: 'beginner' as const },
  ];

  await Promise.all(
    chords.map((chord) =>
      prisma.chord.create({
        data: {
          ...chord,
          frets: chord.frets as any,
          fingers: chord.fingers as any,
        },
      })
    )
  );

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
