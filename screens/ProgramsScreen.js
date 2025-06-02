import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const programs = [
  { type: 'header', title: 'Morning Programs' },
  {
    title: 'Ronda Pilipinas',
    anchors: 'Lorenz Tanjoco & Michael Rogas',
    time: '4:00 AM - 5:00 AM',
    image: require('../assets/Programs/ronda.png'),
  },
  {
    title: 'Usapang Agrikultura',
    anchors: 'Hero Robregado',
    time: '5:00 AM - 6:00 AM',
    image: require('../assets/Programs/agri.png'),
  },
  {
    title: 'RP News - Nationwide',
    anchors: 'Alan Allanigue',
    time: '6:00 AM - 7:00 AM',
    image: require('../assets/Programs/newsnationwide6am.png'),
  },
  {
    title: 'Balitang Pambansa',
    anchors: 'PTV',
    time: '7:00 AM - 7:30 AM',
    image: require('../assets/Programs/balitangpambansa.png'),
  },
  {
    title: 'Boses',
    anchors: 'Alan Allanigue',
    time: '7:30 AM - 8:00 AM',
    image: require('../assets/Programs/boses.png'),
  },
  {
    title: 'Bangon, Bayang Mahal',
    anchors: 'Rey Sampang',
    time: '8:00 AM - 9:00 AM',
    image: require('../assets/Programs/bbm.png'),
  },
  {
    title: 'Mike Abe Live',
    anchors: 'Mike Abe',
    time: '9:00 AM - 10:00 AM (Mon, Wed, Thu, Fri)',
    image: require('../assets/Programs/mikeabe.png'),
  },
  {
    title: 'Kapihan sa Bagong Pilipinas',
    anchors: 'PIA Facebook Page',
    time: '9:00 AM - 10:00 AM (Tuesday)',
    image: require('../assets/Programs/kapihan.jpg'),
  },
  {
    title: 'Radyo Publiko - Serbisyo',
    anchors: 'Kiko Flores & Precious Hipolito-Castelo',
    time: '10:00 AM - 11:00 AM',
    image: require('../assets/Programs/radyopubliko.png'),
  },
  {
    title: 'RP News - Nationwide',
    anchors: 'Alan Allanigue',
    time: '11:00 AM - 12:00 PM',
    image: require('../assets/Programs/newsnation11.png'),
  },
  { type: 'header', title: 'Afternoon Programs' },
  {
    title: 'Balitang Pambansa',
    anchors: 'PTV',
    time: '12:00 PM - 12:30 PM',
    image: require('../assets/Programs/balitangpambansa.png'),
  },
  {
    title: 'Bagong Pilipinas Ngayon',
    anchors: 'PTV',
    time: '12:30 PM - 1:00 PM',
    image: require('../assets/Programs/bagongpilipinas.jpg'),
  },
  {
    title: 'Doctors on Board',
    anchors: 'Dr. Carlo Cayanan / DOH / Ched Oliva',
    time: '1:00 PM - 2:00 PM (Mon, Wed, Thu, Fri)',
    image: require('../assets/Programs/dob.png'),
  },
  {
    title: 'Leslie Bocobo Live!',
    anchors: 'Leslie Bocobo',
    time: '1:00 PM - 2:00 PM (Tuesday)',
    image: require('../assets/Programs/lesliebocobo.jpg'),
  },
  {
    title: 'JUAN TRABAHO',
    anchors: 'Jaemie Quinto',
    time: '2:00 PM - 3:00 PM',
    image: require('../assets/Programs/juantrabaho.png'),
  },
  {
    title: 'Impormasyon at Aksyon sa Bagong Pilipinas',
    anchors: 'Emver Cortez',
    time: '3:00 PM - 4:00 PM (Monday)',
    image: require('../assets/Programs/pia.png'),
  },
  {
    title: 'Sports Round-up',
    time: '3:00 PM - 4:00 PM (Tuesday)',
    image: require('../assets/Programs/rp.png'),
  },
  {
    title: 'Sakay Na!',
    anchors: 'Jhonie Gesmundo',
    time: '3:00 PM - 4:00 PM (Wednesday)',
    image: require('../assets/Programs/dotr.png'),
  },
  {
    title: 'Tahanan ng OFW',
    anchors: 'Asec. Kiko De Guzman',
    time: '3:00 PM - 4:00 PM (Thursday)',
    image: require('../assets/Programs/ofw.png'),
  },
  {
    title: 'DOLE at your service sa Bagong Pilipinas',
    anchors: 'Rey Sampang & Dir. Rosalinda Pineda',
    time: '3:00 PM - 4:00 PM (Friday)',
    image: require('../assets/Programs/dole.png'),
  },
  {
    title: 'Mark In, Mark Out',
    anchors: 'Jaymark Dagala',
    time: '4:00 PM - 4:55 PM',
    image: require('../assets/Programs/mimo.png'),
  },
  {
    title: 'Balitang Bayan Alas Singko',
    anchors: 'Rigie Malinao',
    time: '5:00 PM - 6:00 PM (Mon - Thu)',
    image: require('../assets/Programs/balitangbayan.png'),
  },
  {
    title: 'Usapang Budget Natin',
    anchors: 'Usec. Goddess Hope Libiran',
    time: '5:00 PM - 6:00 PM (Friday)',
    image: require('../assets/Programs/budget.png'),
  },
  {
    title: 'Balitang Pambansa',
    anchors: 'PTV',
    time: '6:00 PM - 6:30 PM',
    image: require('../assets/Programs/balitangpambansa.png'),
  },
  {
    title: 'Salaam Radio',
    anchors: 'Nords Maglaque & Princess Habiba Sarip-Paudac',
    time: '6:30 PM - 8:00 PM',
    image: require('../assets/Programs/saalam.png'),
  },
  {
    title: 'Vloggers ng Bagong Pilipinas',
    anchors: 'Stephen Li',
    time: '8:00 PM - 9:30 PM',
    image: require('../assets/Programs/vlog.png'),
  },
  {
    title: 'Balitang Pambansa',
    anchors: 'PTV',
    time: '9:00 PM - 10:00 PM',
    image: require('../assets/Programs/balitangpambansa.png'),
  },
];

const { width } = Dimensions.get('window');

export default function ProgramsScreen() {
  const { colors, isDarkMode } = useTheme();
  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <FlatList
        data={programs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return <Text style={[styles.sectionHeader, { backgroundColor: colors.primary, color: colors.text }]}>{item.title}</Text>;
          }
          return (
            <View style={[styles.card, { backgroundColor: colors.primary, shadowColor: colors.button }]}>
              <Image source={item.image} style={styles.image} />
              <View style={[styles.overlay, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)' }]}>
                <Text style={[styles.title, { color: isDarkMode ? colors.text : '#FFFFFF' }]}>{item.title}</Text>
                <View style={styles.infoContainer}>
                  {item.anchors && <Text style={[styles.anchors, { color: isDarkMode ? colors.text : '#FFFFFF' }]}>{item.anchors}</Text>}
                  {item.time && <Text style={[styles.time, { color: isDarkMode ? colors.text : '#FFFFFF' }]}>{item.time}</Text>}
                </View>
              </View>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    textTransform: 'uppercase',
    padding: 8,
    borderRadius: 5,
  },
  card: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5, // Add shadow for Android
    // shadowColor will be set dynamically
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor will be set dynamically
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  anchors: {
    fontSize: 14,
    flex: 1,
  },
  time: {
    fontSize: 14,
    textAlign: 'right',
  },
});
