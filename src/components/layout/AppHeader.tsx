import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../ui/Typography';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';

const LOGO = require('../../../assets/final-ems-logo.png-3.svg');

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(): string {
  const d = new Date();
  return `${d.getDate()} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(): string {
  const d = new Date();
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

export const AppHeader: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuthStore();
  const [time, setTime] = useState(formatTime());
  const [date, setDate] = useState(formatDate());
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime());
      setDate(formatDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onLogout = () => {
    setMenuOpen(false);
    logout();
  };

  const navigateToFacilities = () => {
    setMenuOpen(false);
    navigation.navigate('FacilitySelection' as never);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'AR' : 'EN');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Top Bar (Logo + Date/Weather) */}
      <View style={styles.topBar}>
        <Image source={LOGO} style={styles.logoImg} contentFit="contain" />
        <View style={styles.topBarRight}>
          <Typography variant="xs" color={colors.textPrimary} style={styles.dateText}>
            {date}   {time}
          </Typography>
          <View style={styles.weatherRow}>
            <MaterialCommunityIcons name="weather-sunny" size={12} color="#f59e0b" />
            <Typography variant="xs" color={colors.textSecondary} style={styles.weatherText}>
              {'  '}28°C – Sunny
            </Typography>
          </View>
        </View>
      </View>

      {/* Navigation Row (Back + Menu) */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.canGoBack() && navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.navRight}>
          <TouchableOpacity style={styles.langDropdown} activeOpacity={0.7} onPress={toggleLang}>
            <Typography variant="xs" color={colors.textPrimary} style={styles.langText}>
              {lang}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} onPress={() => setMenuOpen(true)}>
            <MaterialCommunityIcons name="dots-vertical" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu Modal */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={styles.menuOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuSheet}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.75} onPress={navigateToFacilities}>
                  <MaterialCommunityIcons name="office-building" size={18} color={colors.textPrimary} />
                  <Typography variant="sm" color={colors.textPrimary} style={styles.menuItemText}>
                    Facilities
                  </Typography>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.75} onPress={onLogout}>
                  <MaterialCommunityIcons name="logout" size={18} color={colors.danger} />
                  <Typography variant="sm" color={colors.danger} style={styles.menuItemText}>
                    Logout
                  </Typography>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingHorizontal: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logoImg: {
    width: 120,
    height: 40,
  },
  topBarRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  weatherText: {
    fontSize: 10,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  langText: {
    fontSize: 11,
    fontWeight: '600',
  },
  menuButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'flex-end',
    paddingTop: 110,
    paddingRight: 16,
  },
  menuSheet: {
    backgroundColor: 'rgba(11, 21, 38, 0.98)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minWidth: 140,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemText: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

