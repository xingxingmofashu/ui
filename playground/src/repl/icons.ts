import {
  AlertTriangle,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Archive,
  ArrowRight,
  Bell,
  Bold,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Info,
  Italic,
  KeyRound,
  Lamp,
  Layers,
  LayoutGrid,
  Link,
  List,
  Lock,
  Mail,
  MapPin,
  Menu,
  Moon,
  MoveDown,
  Pencil,
  Pin,
  Plus,
  Radio,
  Redo2,
  Rocket,
  RotateCcw,
  Rows3,
  Save,
  Scissors,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Trash2,
  Type,
  Underline,
  Undo2,
  Upload,
  UserMinus,
  UserRound,
  UsersRound,
  XCircle,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const icons = {
  AlertTriangle,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Archive,
  ArrowRight,
  Bell,
  Bold,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Info,
  Italic,
  KeyRound,
  Lamp,
  Layers,
  LayoutGrid,
  Link,
  List,
  Lock,
  Mail,
  MapPin,
  Menu,
  Moon,
  MoveDown,
  Pencil,
  Pin,
  Plus,
  Radio,
  Redo2,
  Rocket,
  RotateCcw,
  Rows3,
  Save,
  Scissors,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Trash2,
  Type,
  Underline,
  Undo2,
  Upload,
  UserMinus,
  UserRound,
  UsersRound,
  XCircle,
  Zap,
  ZoomIn,
  ZoomOut,
} as const;

const iconNames = Object.keys(icons).sort();

function createIconModule() {
  const message = `The lucide-react icon is not available in this REPL. Available icons: ${iconNames.join(", ")}.`;

  return new Proxy(icons, {
    get(target, property) {
      if (property === "__esModule") return true;
      if (property === "default") return target;
      if (typeof property === "symbol") {
        return Reflect.get(target, property);
      }

      if (Object.hasOwn(target, property)) {
        return target[property as keyof typeof target];
      }

      throw new Error(message.replace("The lucide-react icon", `"${property}"`));
    },
  });
}

export { createIconModule };
