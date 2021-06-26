import React from 'react';
import { 
  View, 
  Text,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';
import Ilustration from '../../assets/illustration.png'

import { Button } from '../../components/Button';
import { Background } from '../../components/Background';

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image 
          source={Ilustration} 
          style={styles.image} 
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{'\n'}
            favoritos com seus amigos
          </Text>
          {loading ?
            <ActivityIndicator 
              color={theme.colors.primary}
            />
          :
            <Button 
              text="Entrar com Discord" 
              icon
              onPress={handleSignIn}
            />
          }
          
        </View>
      </View>
    </Background>
  )
}
