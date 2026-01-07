import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Profile = ({ student = {}, onBack = () => {}, onLogout = () => {} }) => {
  // Safe defaults
  const safeStudent = {
    name: student.name || 'Mirza Arish Baig',
    grade: student.grade || 'Grade 11',
    avatar:
      student.avatar ||
      'https://i.pravatar.cc/150?img=3',
    studentId: student.studentId || 'STU12345',
    email: student.email || 'arish@example.com',
    joinedDate: student.joinedDate || '2025-01-01',
  };

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#5f2d03" />
        </Pressable>
        <Text style={styles.navTitle}>My Profile</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      {/* Avatar + Name */}
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.avatarWrapper,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          <Image source={{ uri: safeStudent.avatar }} style={styles.avatar} />
          <View style={styles.avatarEdit}>
            <MaterialIcons name="edit" size={16} color="#fff" />
          </View>
        </Animated.View>
        <Text style={styles.name}>{safeStudent.name}</Text>
        <Text style={styles.grade}>{safeStudent.grade}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsCard}>
        <ProfileItem
          label="Student ID"
          value={safeStudent.studentId}
          icon={<Ionicons name="id-card-outline" size={20} color="#5f2d03" />}
        />
        <ProfileItem
          label="Email Address"
          value={safeStudent.email}
          icon={<MaterialIcons name="email" size={20} color="#5f2d03" />}
        />
        <ProfileItem
          label="Enrollment Date"
          value={safeStudent.joinedDate}
          icon={<Ionicons name="calendar-outline" size={20} color="#5f2d03" />}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Pressable style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile Settings</Text>
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutBtnText}>Logout Securely</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>v2.4.0 Alpha • MIRZA ARISH BAIG</Text>
    </ScrollView>
  );
};

const ProfileItem = ({ label, value, icon }) => (
  <View style={styles.profileItem}>
    <View style={styles.iconWrapper}>{icon}</View>
    <View>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E9DC',
  },

  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  avatarWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5f2d03',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  grade: {
    fontSize: 14,
    color: 'rgba(95,45,3,0.6)',
    marginTop: 4,
  },

  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(95,45,3,0.05)',
    overflow: 'hidden',
    elevation: 3,
  },

  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(95,45,3,0.05)',
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(95,45,3,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(95,45,3,0.4)',
  },

  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5f2d03',
    marginTop: 2,
  },

  actions: {
    marginTop: 32,
    marginHorizontal: 24,
    gap: 16,
  },

  editBtn: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(95,45,3,0.05)',
    elevation: 2,
  },

  editBtnText: {
    fontWeight: 'bold',
    color: '#5f2d03',
  },

  logoutBtn: {
    backgroundColor: '#5f2d03',
    height: 56,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  logoutBtnText: {
    fontWeight: 'bold',
    color: '#fff',
  },

  footer: {
    textAlign: 'center',
    marginVertical: 32,
    fontSize: 12,
    color: 'rgba(95,45,3,0.3)',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default Profile;
