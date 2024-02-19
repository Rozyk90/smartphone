import BatteryCharging20Icon from "@mui/icons-material/BatteryCharging20";
import BatteryCharging30Icon from "@mui/icons-material/BatteryCharging30";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import BatteryCharging60Icon from "@mui/icons-material/BatteryCharging60";
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Battery20Icon from "@mui/icons-material/Battery20";
import Battery30Icon from "@mui/icons-material/Battery30";
import Battery50Icon from "@mui/icons-material/Battery50";
import Battery60Icon from "@mui/icons-material/Battery60";
import Battery80Icon from "@mui/icons-material/Battery80";
import Battery90Icon from "@mui/icons-material/Battery90";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

export default function ReturnBatteryIcon(battery: number, isCharging: boolean){
    if (battery === 100) {
      return BatteryFullIcon;
    } else if (battery > 95) {
      return isCharging ? BatteryChargingFullIcon : BatteryFullIcon;
    } else if (battery > 80) {
      return isCharging ? BatteryCharging90Icon : Battery90Icon;
    } else if (battery > 60) {
      return isCharging ? BatteryCharging80Icon : Battery80Icon;
    } else if (battery > 50) {
      return isCharging ? BatteryCharging60Icon : Battery60Icon;
    } else if (battery > 30) {
      return isCharging ? BatteryCharging50Icon : Battery50Icon;
    } else if (battery > 20) {
      return isCharging ? BatteryCharging30Icon : Battery30Icon;
    } else {
      return isCharging ? BatteryCharging20Icon : Battery20Icon;
    }
  };