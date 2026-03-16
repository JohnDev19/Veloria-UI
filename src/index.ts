// ─── Types ────────────────────────────────────────────────────────────────
export type {
  Size,
  ResponsiveSize,
  ColorScheme,
  Variant,
  Placement,
  Side,
  VeloriaBaseProps,
  VeloriaAriaProps,
  AsChildProps,
  Orientation,
  Status,
  Theme,
  VariantProps,
} from "./types";

// ─── Utils ────────────────────────────────────────────────────────────────
export { cn, composeEventHandlers, generateId, isBrowser, isDefined, noop } from "./utils/cn";

// ─── Tailwind plugin ──────────────────────────────────────────────────────
export { veloriaPlugin, veloriaPreset } from "./tailwind";

// ─── Basic ────────────────────────────────────────────────────────────────
export {
  Button,
  IconButton,
  Link,
  Badge,
  Avatar,
  AvatarGroup,
  Divider,
  Tag,
  Chip,
  Tooltip,
} from "./components/basic";
export type {
  ButtonProps,
  IconButtonProps,
  BadgeProps,
  AvatarProps,
  AvatarGroupProps,
  DividerProps,
  TagProps,
  ChipProps,
  TooltipProps,
  TooltipProvider,
} from "./components/basic";

// ─── Layout ───────────────────────────────────────────────────────────────
export {
  Container,
  Stack,
  Grid,
  Flex,
  Section,
  Spacer,
  AspectRatio,
  Center,
  ScrollArea,
  Masonry,
} from "./components/layout";
export type {
  ContainerProps,
  StackProps,
  GridProps,
  FlexProps,
  SectionProps,
  SpacerProps,
  CenterProps,
  MasonryProps,
} from "./components/layout";

// ─── Navigation ───────────────────────────────────────────────────────────
export {
  Navbar,
  Sidebar,
  Menu,
  MenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  Breadcrumb,
  Pagination,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stepper,
  CommandDialog,
  CommandItem,
  CommandGroup,
  CommandSeparator,
} from "./components/navigation";
export type {
  NavbarProps,
  SidebarProps,
  MenuProps,
  MenuItemProps,
  BreadcrumbProps,
  PaginationProps,
  TabsProps,
  StepperProps,
} from "./components/navigation";

// ─── Forms ────────────────────────────────────────────────────────────────
export {
  Input,
  TextArea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  RangeSlider,
  DatePicker,
  TimePicker,
  FileUpload,
  OTPInput,
  ColorPicker,
  Combobox,
  MultiSelect,
} from "./components/forms";
export type {
  InputProps,
  TextAreaProps,
  CheckboxProps,
  SwitchProps,
  SliderProps,
  RangeSliderProps,
  DatePickerProps,
  TimePickerProps,
  FileUploadProps,
  OTPInputProps,
  ColorPickerProps,
  ComboboxProps,
  MultiSelectProps,
} from "./components/forms";

// ─── Data Display ─────────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  DataTable,
  List,
  ListItem,
  Statistic,
  Timeline,
  TimelineItem,
  Calendar,
  CodeBlock,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/data-display";
export type {
  CardProps,
  DataTableProps,
  ListProps,
  StatisticProps,
  TimelineEvent,
  CalendarProps,
  CodeBlockProps,
} from "./components/data-display";

// ─── Feedback ─────────────────────────────────────────────────────────────
export {
  Alert,
  AlertTitle,
  AlertDescription,
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Skeleton,
  Progress,
  Spinner,
  LoadingSpinner,
  EmptyState,
  StatusIndicator,
  Notification,
} from "./components/feedback";
export type {
  AlertProps,
  SkeletonProps,
  ProgressProps,
  SpinnerProps,
  EmptyStateProps,
  StatusIndicatorProps,
  NotificationProps,
} from "./components/feedback";

// ─── Overlay ──────────────────────────────────────────────────────────────
export {
  Modal,
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Drawer,
  Sheet,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuRadioGroup,
  Lightbox,
  ImageViewer,
} from "./components/overlay";
export type {
  ModalProps,
  DrawerProps,
  CommandDialogProps,
  LightboxProps,
} from "./components/overlay";

// ─── Media ────────────────────────────────────────────────────────────────
export {
  Image,
  VideoPlayer,
  AudioPlayer,
  Carousel,
  Gallery,
} from "./components/media";
export type {
  ImageProps,
  VideoPlayerProps,
  AudioPlayerProps,
  CarouselProps,
  GalleryImage,
  GalleryProps,
} from "./components/media";

// ─── Utility ──────────────────────────────────────────────────────────────
export {
  ThemeSwitcher,
  CopyButton,
  KeyboardShortcut,
  ResizablePanel,
  DragDropArea,
} from "./components/utility";
export type {
  ThemeSwitcherProps,
  CopyButtonProps,
  KeyboardShortcutProps,
  ResizablePanelProps,
  DragDropAreaProps,
} from "./components/utility";

// ─── Hooks ────────────────────────────────────────────────────────────────
export {
  useDisclosure,
  useMediaQuery,
  useBreakpoint,
  useClipboard,
  useLocalStorage,
  useTheme,
  useDebounce,
  useOnClickOutside,
  useKeydown,
  useMounted,
  useId,
} from "./hooks";
export type { UseDisclosureOptions, UseClipboardOptions, VeloriaTheme } from "./hooks";

export {
  useToast,
  ToastContextProvider,
} from "./hooks/use-toast";
export type { ToastVariant, ToastData, ToastInput } from "./hooks/use-toast";

// ─── v0.1.2 — New Components ─────────────────────────────────────────────

// Advanced Forms
export { PhoneInput, TagInput, CurrencyInput, RatingInput } from "./components/advanced-forms";
export type { PhoneInputProps, TagInputProps, CurrencyInputProps, RatingInputProps } from "./components/advanced-forms";

// Data Display
export { StatsCard, TreeView, JsonViewer, Heatmap, KanbanBoard } from "./components/data-display";
export type {
  StatsCardProps, TreeNode, TreeViewProps,
  JsonViewerProps, JsonValue,
  HeatmapCell, HeatmapProps,
  KanbanCard, KanbanColumn, KanbanBoardProps,
} from "./components/data-display";

// Feedback & Overlay
export { BannerAlert, ConfirmDialog, FloatingActionButton, RichTooltip, Tour } from "./components/feedback";
export type {
  BannerAlertProps, ConfirmDialogProps,
  FABAction, FloatingActionButtonProps,
  RichTooltipProps, TourStep, TourProps,
} from "./components/feedback";

// Utility
export { InfiniteScroll, VirtualList } from "./components/utility";
export type { InfiniteScrollProps, VirtualListProps } from "./components/utility";

// ─── v0.1.2 — New Hooks ──────────────────────────────────────────────────
export {
  useForm,
  usePagination,
  useIntersection,
  useWindowSize,
  useStep,
  useCountdown,
} from "./hooks";
export type {
  UseFormOptions, UseFormReturn,
  UsePaginationOptions, UsePaginationReturn,
  UseIntersectionOptions, WindowSize,
  UseStepOptions, UseStepReturn,
  UseCountdownOptions, UseCountdownReturn,
} from "./hooks";