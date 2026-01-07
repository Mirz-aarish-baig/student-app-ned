import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Animated,
  Alert,
} from 'react-native';
import SubjectCard from '../components/SubjectCard';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  // Dummy student
  const [student] = useState({
    name: 'Mirza Arish Baig',
    avatar: 'https://i.pravatar.cc/150?img=3',
  });

  // Dummy subjects
  const [subjects] = useState([
    { id: '1', name: 'Mathematics', teacher: 'Mr. Khan', marks: 85, totalMarks: 100, attendance: 92 },
    { id: '2', name: 'Physics', teacher: 'Mrs. Ali', marks: 78, totalMarks: 100, attendance: 88 },
    { id: '3', name: 'Chemistry', teacher: 'Dr. Ahmed', marks: 90, totalMarks: 100, attendance: 95 },
    { id: '4', name: 'English', teacher: 'Ms. Fatima', marks: 82, totalMarks: 100, attendance: 89 },
  ]);

  // Animations
  const animations = useRef(subjects.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const anims = animations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 120,
        useNativeDriver: true,
      })
    );
    Animated.stagger(120, anims).start();
  }, [animations]);

  // Handlers
  const handleProfileClick = () => {
    navigation.navigate('Profile', { student }); // pass student to profile
  };

  const handleSubjectClick = (subject) => {
    navigation.navigate('SubjectDetail', { student, subject }); // pass student + subject
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.replace('Login'); // replace to login screen
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcome}>WELCOME BACK</Text>
            <Text style={styles.name}>{student.name}</Text>
          </View>

          <Pressable style={styles.avatarWrapper} onPress={handleProfileClick}>
            <Image source={{ uri: student.avatar }} style={styles.avatar} />
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AVG. GRADE</Text>
            <Text style={styles.statValue}>A- (86%)</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ATTENDANCE</Text>
            <Text style={styles.statValue}>91.5%</Text>
          </View>
        </View>
      </View>

      {/* Subjects */}
      <View style={styles.subjectSection}>
        <View style={styles.subjectHeader}>
          <Text style={styles.subjectTitle}>Your Subjects</Text>
          <Text style={styles.subjectCount}>{subjects.length} Total</Text>
        </View>

        {subjects.map((subject, index) => {
          const translateY = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          });

          return (
            <Animated.View
              key={subject.id || index}
              style={{ opacity: animations[index], transform: [{ translateY }], marginBottom: 12 }}
            >
              <SubjectCard subject={subject} onPress={() => handleSubjectClick(subject)} />
            </Animated.View>
          );
        })}
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E9DC',
  },
  
  header: {
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  logoutButton: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 20, 
    backgroundColor: '#5f2d03',
    borderRadius: 24,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
    logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  welcome: {
    fontSize: 12,
    letterSpacing: 2,
    color: 'rgba(95,45,3,0.6)',
    fontWeight: '600',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5f2d03',
    marginTop: 4,
  },

  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(95,45,3,0.2)',
    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(95,45,3,0.05)',
    padding: 16,
    borderRadius: 20,
  },

  statLabel: {
    fontSize: 11,
    color: 'rgba(95,45,3,0.5)',
    fontWeight: '700',
    marginBottom: 4,
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  subjectSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    paddingBottom: 40,
  },

  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  subjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  subjectCount: {
    fontSize: 14,
    color: 'rgba(95,45,3,0.6)',
    fontWeight: '600',
  },
});


export default Dashboard;
