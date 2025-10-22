import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button';

const CounterModal = ({ visible, onClose }) => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    console.log('component ilk yüklendiğinde çalışır!');

    let i = 0;

    const id = setInterval(() => {
      if (isRunning) {
        i += 1;
        setCounter(i);
        console.log(`Sayaç: ${i}`);
      }
    }, 1000);

    // clean-up function
    return () => {
      console.log('component ekrandan kaldırıldığında çalışır!');
      clearInterval(id);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setCounter(0);
    setIsRunning(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zamanlayıcı</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Counter Display */}
          <View style={styles.counterDisplay}>
            <Text style={styles.counterIcon}>⏱️</Text>
            <Text style={styles.counterValue}>{counter}</Text>
            <Text style={styles.counterLabel}>saniye</Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              isRunning ? styles.statusRunning : styles.statusPaused,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isRunning ? styles.dotRunning : styles.dotPaused,
              ]}
            />
            <Text style={styles.statusText}>
              {isRunning ? 'Çalışıyor' : 'Duraklatıldı'}
            </Text>
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            Sayaç arka planda çalışmaya devam edecek
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.pauseButton]}
              onPress={toggleTimer}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>
                {isRunning ? '⏸️ Durdur' : '▶️ Başlat'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.resetButton]}
              onPress={resetTimer}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>🔄 Sıfırla</Text>
            </TouchableOpacity>
          </View>

          {/* Close Button */}
          <View style={styles.closeButtonContainer}>
            <Button
              title="Kapat"
              onPress={onClose}
              variant="outline"
              fullWitdh
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  counterDisplay: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 20,
  },
  counterIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginBottom: 8,
  },
  counterLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 12,
  },
  statusRunning: {
    backgroundColor: '#d1fae5',
  },
  statusPaused: {
    backgroundColor: '#fee2e2',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotRunning: {
    backgroundColor: '#10b981',
  },
  dotPaused: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    backgroundColor: '#2f95dc',
  },
  resetButton: {
    backgroundColor: '#6b7280',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  closeButtonContainer: {
    marginTop: 8,
  },
});

export default CounterModal;
