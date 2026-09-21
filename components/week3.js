import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const spacing = { xs: 4, sm: 8, md: 16, lg: 24 };
const resolve = (colorStyle = {}) => ({
  background: "#FFFFFF",
  surface: "#F7F8FA",
  text: "#172033",
  mutedText: "#5E6B82",
  border: "#D8DEEA",
  primary: "#2855D9",
  primaryText: "#FFFFFF",
  disabled: "#AAB4C4",
  checked: "#1C8C57",
  ...colorStyle,
});

export function Header({
  title,
  subtitle,
  colorStyle,
  leftAction,
  rightAction,
}) {
  const p = resolve(colorStyle);
  return (
    <View
      style={[
        headerStyles.header,
        { backgroundColor: p.background, borderBottomColor: p.border },
      ]}
    >
      <HeaderAction action={leftAction} color={p.primary} />
      <View style={headerStyles.titleBlock}>
        <Text numberOfLines={1} style={[headerStyles.title, { color: p.text }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[headerStyles.subtitle, { color: p.mutedText }]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <HeaderAction action={rightAction} color={p.primary} right />
    </View>
  );
}
function HeaderAction({ action, color, right }) {
  return action ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={action.label}
      onPress={action.onPress}
      style={[headerStyles.action, right && headerStyles.right]}
    >
      <Text style={[headerStyles.actionText, { color }]}>{action.label}</Text>
    </Pressable>
  ) : (
    <View style={headerStyles.action} />
  );
}
export function Footer({ brand, links, colorStyle, compact }) {
  const p = resolve(colorStyle);
  return (
    <View
      style={[
        footerStyles.footer,
        compact && footerStyles.compact,
        { backgroundColor: p.surface, borderTopColor: p.border },
      ]}
    >
      <Text style={[footerStyles.brand, { color: p.text }]}>{brand}</Text>
      <View style={footerStyles.links}>
        {links.map((link) => (
          <Pressable
            key={link.label}
            accessibilityRole="link"
            onPress={link.onPress}
          >
            <Text style={[footerStyles.link, { color: p.mutedText }]}>
              {link.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
export function List({
  items,
  variant,
  checkedIds = [],
  onToggleItem,
  onMoveItem,
  colorStyle,
}) {
  const p = resolve(colorStyle);
  return (
    <View>
      {items.map((item, index) => {
        const checked = checkedIds.includes(item.id);
        const marker = variant === "checklist" ? (checked ? "✓" : "○") : "⠿";
        return (
          <Pressable
            key={item.id}
            accessibilityRole={variant === "checklist" ? "checkbox" : "button"}
            accessibilityState={{ checked }}
            onPress={() =>
              variant === "checklist" ? onToggleItem?.(item) : undefined
            }
            style={({ pressed }) => [
              listStyles.row,
              { borderBottomColor: p.border },
              pressed && listStyles.pressed,
            ]}
          >
            <Text
              style={[
                listStyles.marker,
                { color: checked ? p.checked : p.primary },
              ]}
            >
              {marker}
            </Text>
            <Text
              style={[
                listStyles.label,
                { color: p.text },
                checked && listStyles.checked,
              ]}
            >
              {item.label}
            </Text>
            {variant === "draggable" ? (
              <View style={listStyles.controls}>
                <Pressable
                  disabled={index === 0}
                  accessibilityLabel={`Move ${item.label} up`}
                  onPress={() => onMoveItem?.(item, index, index - 1)}
                >
                  <Text
                    style={[
                      listStyles.move,
                      { color: p.primary },
                      index === 0 && listStyles.disabled,
                    ]}
                  >
                    ↑
                  </Text>
                </Pressable>
                <Pressable
                  disabled={index === items.length - 1}
                  accessibilityLabel={`Move ${item.label} down`}
                  onPress={() => onMoveItem?.(item, index, index + 1)}
                >
                  <Text
                    style={[
                      listStyles.move,
                      { color: p.primary },
                      index === items.length - 1 && listStyles.disabled,
                    ]}
                  >
                    ↓
                  </Text>
                </Pressable>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  colorStyle,
}) {
  const p = resolve(colorStyle);
  return (
    <View style={formStyles.field}>
      <Text style={[formStyles.label, { color: p.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={p.mutedText}
        style={[
          formStyles.input,
          {
            backgroundColor: p.background,
            borderColor: p.border,
            color: p.text,
          },
        ]}
      />
    </View>
  );
}
export function SelectField({ label, value, options, onChange, colorStyle }) {
  const [open, setOpen] = useState(false);
  const p = resolve(colorStyle);
  const selected = options.find((option) => option.value === value);
  return (
    <View style={formStyles.field}>
      <Text style={[formStyles.label, { color: p.text }]}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((current) => !current)}
        style={[
          formStyles.select,
          { backgroundColor: p.background, borderColor: p.border },
        ]}
      >
        <Text style={{ color: p.text }}>{selected?.label}</Text>
        <Text style={{ color: p.mutedText }}>⌄</Text>
      </Pressable>
      {open ? (
        <View
          style={[
            formStyles.menu,
            { backgroundColor: p.background, borderColor: p.border },
          ]}
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              accessibilityRole="menuitem"
              onPress={() => {
                onChange(option.value);
                setOpen(false);
              }}
              style={formStyles.option}
            >
              <Text style={{ color: p.text }}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
export function SubmitButton({
  label,
  onPress,
  disabled,
  variant = "primary",
  colorStyle,
  style,
}) {
  const p = resolve(colorStyle);
  const secondary = variant === "secondary";
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      style={({ pressed }) => [
        formStyles.button,
        {
          backgroundColor: secondary ? p.background : p.primary,
          borderColor: p.primary,
        },
        disabled && { backgroundColor: p.disabled, borderColor: p.disabled },
        pressed && !disabled && formStyles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          formStyles.buttonText,
          { color: secondary ? p.primary : p.primaryText },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
const headerStyles = StyleSheet.create({
  header: {
    minHeight: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleBlock: { flex: 1, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 12, marginTop: 3 },
  action: { width: 64, minHeight: 42, justifyContent: "center" },
  right: { alignItems: "flex-end" },
  actionText: { fontSize: 14, fontWeight: "700" },
});
const footerStyles = StyleSheet.create({
  footer: {
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  compact: { flexDirection: "column", alignItems: "flex-start" },
  brand: { fontSize: 14, fontWeight: "700" },
  links: { flexDirection: "row", gap: spacing.md },
  link: { fontSize: 13, paddingVertical: 2 },
});
const listStyles = StyleSheet.create({
  row: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  marker: { width: 33, textAlign: "center", fontSize: 19, fontWeight: "700" },
  label: { flex: 1, fontSize: 15, lineHeight: 20 },
  checked: { textDecorationLine: "line-through", opacity: 0.68 },
  controls: { flexDirection: "row", gap: 5 },
  move: { fontSize: 19, fontWeight: "700", padding: 8 },
  disabled: { opacity: 0.26 },
  pressed: { opacity: 0.62 },
});
const formStyles = StyleSheet.create({
  field: { gap: spacing.xs },
  label: { fontSize: 14, fontWeight: "700" },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
  },
  select: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menu: { borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  option: {
    minHeight: 45,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  button: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.75 },
});
