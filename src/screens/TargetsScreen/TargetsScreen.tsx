import { SafeAreaView, Text } from 'react-native';
import { RootState } from '../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { TargetCard } from './TargetCard';
import { ContributionGraph, PieChart } from 'react-native-chart-kit';

const selectTargets = (state: RootState) => state.user.targets;
export const TargetsScreen = () => {
  const targets = useSelector(selectTargets);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#3C1874', flex: 1 }}>
      <Text style={{ fontSize: 34, marginTop: 15, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>
        Targets
      </Text>

      <TargetCard row={targets} />
    </SafeAreaView>
  );
};
