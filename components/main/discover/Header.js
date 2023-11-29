import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import FilterModal from "./FilterModal";
import FilterScreen from './FilterScreen'
export const Header = ({
  options,
  onSearch,
  onFilterOpen,
  isFilterVisible,
  onClose,
  isDiscoverFilter,
  address,
  isFromToggle,
  onBackPress
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      {isFilterVisible ? isFromToggle ? (
     <FilterModal
     address={address}
     onClose={onClose}
     onSearch={onSearch}
     visible={isFilterVisible}
   />
      ) : (
        <FilterScreen
          onClose={onClose}
          onSearch={onSearch}
          visible={isFilterVisible}
          isDiscoverFilter={isDiscoverFilter}
          address={address}
        />
      ) : null}
      <View
        style={{
          //   backgroundColor: "red",
          paddingVertical: 15,
          paddingHorizontal: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={onBackPress}>
          <Icons.Bars3CenterLeftIcon color={"black"} />
        </TouchableOpacity>
        <View>
        <Image source={require('../../../assets/images/logo.png')} style={{
            width: 35,
            height: 35,
            resizeMode:'contain'
        }} />
        </View>
        <View>
          <TouchableOpacity onPress={onFilterOpen}>
            <Icons.AdjustmentsVerticalIcon color={"black"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
