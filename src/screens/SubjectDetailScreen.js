import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoRow = ({ icon, label, value, noBorder }) => (
  <View style={[styles.infoRow, noBorder && { borderBottomWidth: 0 }]}>
    <View style={styles.infoIcon}>
      <Ionicons name={icon} size={20} color="#5f2d03" />
    </View>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const SubjectDetail = ({ subject = {}, student = {}, onBack = () => {} }) => {
  // Safe defaults
  const safeSubject = {
    name: subject.name || 'Mathematics',
    teacher: subject.teacher || 'Mr. Khan',
    marks: subject.marks ?? 85,
    attendance: subject.attendance ?? 90,
    room: subject.room || 'Room 101',
    schedule: subject.schedule || 'Mon-Wed-Fri 10:00AM - 11:00AM',
    description: subject.description || 'This subject covers important fundamentals and concepts.',
    color: subject.color || '#5f2d03', // fallback color
  };

  const safeStudent = {
    name: student.name || 'Mirza Arish Baig',
    avatar:
      student.avatar ||
      'https://i.pravatar.cc/150?img=3',
    studentId: student.studentId || 'STU12345',
  };

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header / Hero */}
      <View style={[styles.hero, { backgroundColor: safeSubject.color }]}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.subjectName}>{safeSubject.name}</Text>
          <Text style={styles.teacher}>{safeSubject.teacher}</Text>
        </Animated.View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Student Card */}
        <View style={styles.studentCard}>
          <Image source={{ uri: safeStudent.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.studentName}>{safeStudent.name}</Text>
            <Text style={styles.studentId}>{safeStudent.studentId}</Text>
          </View>
        </View>

        {/* Academic Progress */}
        <Text style={styles.sectionTitle}>Academic Progress</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>GRADE</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{safeSubject.marks}</Text>
              <Text style={styles.statMuted}>/ 100</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ATTENDANCE</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{safeSubject.attendance}</Text>
              <Text style={styles.statMuted}>%</Text>
            </View>
          </View>
        </View>

        {/* Class Information */}
        <Text style={styles.sectionTitle}>Class Information</Text>
        <View style={styles.infoBox}>
          <InfoRow icon="location-outline" label="Location" value={safeSubject.room} />
          <InfoRow icon="time-outline" label="Schedule" value={safeSubject.schedule} noBorder />
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>About Subject</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{safeSubject.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E9DC' },
  hero: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  subjectName: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  teacher: { color: '#fff', fontSize: 16, fontWeight: '500' },
  content: { paddingHorizontal: 24, marginTop: -20 },
  studentCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#5f2d03' },
  studentId: { fontSize: 12, color: 'rgba(95,45,3,0.6)', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#5f2d03', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(95,45,3,0.5)', marginBottom: 4 },
  statValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#5f2d03' },
  statMuted: { fontSize: 12, color: 'rgba(95,45,3,0.4)' },
  infoBox: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  infoRow: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(95,45,3,0.1)', alignItems: 'center', gap: 12 },
  infoIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(95,45,3,0.05)', justifyContent: 'center', alignItems: 'center' },
  infoLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(95,45,3,0.5)' },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#5f2d03' },
  descriptionBox: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 40 },
  descriptionText: { fontSize: 14, color: 'rgba(95,45,3,0.7)', lineHeight: 20 },
});

export default SubjectDetail;
