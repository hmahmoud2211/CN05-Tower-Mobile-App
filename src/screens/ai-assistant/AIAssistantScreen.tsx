import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const bgImage = require('../../../assets/cn05-night.png');

export const AIAssistantScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'System initialized. I am CN-05 AI. How can I assist you with the tower operations today?', sender: 'ai' },
    { id: '2', text: 'Show me the HVAC status on floor 12.', sender: 'user' },
    { id: '3', text: 'Floor 12 HVAC is operating normally. Average temperature is 22.4°C and humidity is 45%. Zone 3 cooling efficiency is slightly reduced but within normal parameters.', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    'HVAC Status',
    'Active Alerts',
    'Elevator Logs',
    'Energy Forecast'
  ];

  const sendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), text: query, sender: 'user' }]);
    
    if (!textToSend) {
      setInput('');
    }

    // Smart hardcoded responses
    let responseText = "I am analyzing your request. Standby for system diagnostic data...";
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('hvac')) {
      responseText = "Floor 12 HVAC is operating normally. Average temperature is 22.4°C and humidity is 45%. Zone 3 cooling efficiency is slightly reduced but within normal parameters.";
    } else if (lowerQuery.includes('alert') || lowerQuery.includes('warning')) {
      responseText = "Currently, there is 1 Active Warning: Elevator E5 Motor is showing abnormal vibration patterns. Staging maintenance recommended within 48h.";
    } else if (lowerQuery.includes('elevator') || lowerQuery.includes('lift') || lowerQuery.includes('log')) {
      responseText = "Elevator Logs for today: All 6 elevators operational. Elevator E5 has logged 12 warning alerts since 08:00 AM regarding rotor speed deviation. Inspections scheduled.";
    } else if (lowerQuery.includes('energy') || lowerQuery.includes('power') || lowerQuery.includes('forecast')) {
      responseText = "Energy Forecast: Peak usage is predicted between 14:00 and 17:00 at 4,800 kW. Recommended action: Pre-cool residential zones by 1°C at 13:00 to shave peak load by 12%.";
    } else {
      responseText = `I have received your query regarding "${query}". The digital twin sensors show that all CN-05 infrastructure systems are currently online and within nominal operational parameters.`;
    }

    // Mock response after 800ms
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString() + 'ai', 
        text: responseText, 
        sender: 'ai' 
      }]);
    }, 800);
  };

  return (
    <AppBackground imageSource={bgImage}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons name="robot" size={28} color={colors.accentCyan} />
          <View style={{ marginLeft: spacing.sm }}>
            <Typography variant="md" fontFamily="orbitron" color={colors.textPrimary}>
              EMS AI
            </Typography>
            <Typography variant="xs" color={colors.success}>
              System Online
            </Typography>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View key={msg.id} style={[
              styles.messageRow,
              msg.sender === 'user' ? styles.messageRowUser : styles.messageRowAI
            ]}>
              {msg.sender === 'ai' && (
                <View style={styles.avatarAI}>
                  <MaterialCommunityIcons name="robot-outline" size={16} color={colors.background} />
                </View>
              )}
              <View style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleAI
              ]}>
                <Typography variant="sm" color={msg.sender === 'user' ? colors.background : colors.textPrimary}>
                  {msg.text}
                </Typography>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestions.map((sug, i) => (
              <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => sendMessage(sug)}>
                <Typography variant="xs" color={colors.accentCyan}>{sug}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <GlassCard style={styles.inputCard} padding={8}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.micButton}>
              <MaterialCommunityIcons name="microphone" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Enter command..."
              placeholderTextColor={colors.textMuted}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => sendMessage()}
            />
            
            <TouchableOpacity 
              style={[styles.sendButton, input ? styles.sendButtonActive : null]} 
              onPress={() => sendMessage()}
              disabled={!input}
            >
              <MaterialCommunityIcons 
                name="send" 
                size={20} 
                color={input ? colors.background : colors.textMuted} 
              />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  chatContainer: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    maxWidth: '85%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  messageRowAI: {
    alignSelf: 'flex-start',
  },
  avatarAI: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentCyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 4,
  },
  messageBubble: {
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
    flexShrink: 1,
  },
  messageBubbleUser: {
    backgroundColor: colors.accentCyan,
    borderBottomRightRadius: 4,
  },
  messageBubbleAI: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderBottomLeftRadius: 4,
  },
  suggestionsContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.sm,
  },
  suggestionChip: {
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginRight: spacing.sm,
    backgroundColor: 'rgba(34, 211, 238, 0.05)',
  },
  inputCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: Platform.OS === 'ios' ? 100 : 85,
    borderRadius: spacing.borderRadius.full,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  micButton: {
    padding: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
    paddingHorizontal: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.accentCyan,
  },
});
