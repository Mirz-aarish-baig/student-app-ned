import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';

const SubjectCard = ({ subject, onPress }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: subject.attendance,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, []);

  const attendanceColor =
    subject.attendance > 90
      ? '#22c55e'
      : subject.attendance > 80
      ? '#f59e0b'
      : '#ef4444';

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.teacher}>{subject.teacher}</Text>
        </View>

        <View style={styles.marksBadge}>
          <Text style={styles.marksText}>
            {subject.marks}/{subject.totalMarks}
          </Text>
        </View>
      </View>

      {/* Attendance */}
      <View style={styles.attendanceWrapper}>
        <View style={styles.attendanceHeader}>
          <Text style={styles.attendanceLabel}>ATTENDANCE</Text>
          <Text style={styles.attendancePercent}>
            {subject.attendance}%
          </Text>
        </View>

        <View style={styles.progressBg}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: attendanceColor,
                width: widthInterpolated,
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(95,45,3,0.05)',
    marginBottom: 16,
    elevation: 3,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
    borderColor: 'rgba(95,45,3,0.2)',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },

  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  teacher: {
    fontSize: 13,
    marginTop: 4,
    color: 'rgba(95,45,3,0.6)',
    fontWeight: '500',
  },

  marksBadge: {
    backgroundColor: 'rgba(95,45,3,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  marksText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  attendanceWrapper: {
    marginTop: 'auto',
  },

  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  attendanceLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(95,45,3,0.4)',
  },

  attendancePercent: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(95,45,3,0.6)',
  },

  progressBg: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(95,45,3,0.08)',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default SubjectCard;
