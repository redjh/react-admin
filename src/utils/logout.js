import { clearMemory } from "./memory";
import history from "./history";
export default function () {
  clearMemory();
  history.push("/login");
}
