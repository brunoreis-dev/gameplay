import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { 
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert, 
  Share,
  Platform,
 } from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Button } from '../../components/Button';

import { styles } from './style';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

type AppointmentDetailsParams = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as AppointmentDetailsParams;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configuraçoes do servidor. Confirme se o Widget está habilitado.')
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header 
        title="Details"
        action={
          guildSelected.guild.owner &&
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto 
                name="share"
                size={24}
                color={theme.colors.primary}
              />
            </BorderlessButton>
        }
      />
      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ?
        <Load />
        :
        <>
          <ListHeader 
            title="Jogadores"
            subtitle={widget.members ? `Total: ${widget.members.length}` : ''}
          />
          {widget.members ?
            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
            :
            <Text style={styles.error}>Não foi possível carregar os membros, verificar se o widget do servidor está ativo!</Text>
          }
          
        </>
      }
      {guildSelected.guild.owner &&
        <View style={styles.footer}>
          <Button 
            onPress={handleOpenGuild}
            text="Entrar na partida"
            icon
          />
        </View>
      }
    </Background>
  );
}
