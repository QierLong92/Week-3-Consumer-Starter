import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Footer,
  Header,
  List,
  SelectField,
  SubmitButton,
  TextField,
} from "./components/week3";

const palette = {
  background: "#F5F7FF",
  surface: "#FFFFFF",
  text: "#172033",
  mutedText: "#62708A",
  border: "#DDE3F1",
  primary: "#2855D9",
  primaryText: "#FFFFFF",
  checked: "#1C8C57",
};

const interests = [
  { id: "fresh", label: "Fresh food and local makers" },
  { id: "learn", label: "Learning and workshops" },
  { id: "outdoors", label: "Time outside" },
];

const savedPlans = [
  { id: "1", label: "Walk the Kerrytown market" },
  { id: "2", label: "Pick up a new library read" },
  { id: "3", label: "Reserve a table for coffee" },
];

function Progress({ active }) {
  return (
    <View
      style={styles.progress}
      accessibilityLabel={`Screen ${active + 1} of 3`}
    >
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index === active && styles.progressDotActive,
          ]}
        />
      ))}
    </View>
  );
}

function DiscoverScreen({ goTo }) {
  const [checkedIds, setCheckedIds] = useState(["fresh"]);

  const toggleInterest = (item) => {
    setCheckedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    );
  };

  return (
    <>
      <Header
        title="Discover"
        subtitle="Choose what feels good today"
        colorStyle={palette}
        leftAction={{ label: "Close", onPress: () => {} }}
        rightAction={{ label: "Skip", onPress: () => goTo(1) }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.overline}>YOUR WEEKEND, YOUR WAY</Text>
          <Text style={styles.heroTitle}>A little space for good things.</Text>
          <Text style={styles.heroCopy}>
            Tell us what you are in the mood for and we'll shape a simple plan
            around it.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>What sounds nice?</Text>
        <Text style={styles.sectionCopy}>
          Pick as many as you like. You can change these later.
        </Text>
        <View style={styles.listCard}>
          <List
            items={interests}
            variant="checklist"
            checkedIds={checkedIds}
            onToggleItem={toggleInterest}
            colorStyle={palette}
          />
        </View>
        <SubmitButton
          label="Build my plan"
          colorStyle={palette}
          onPress={() => goTo(1)}
          style={styles.primaryButton}
        />
        <Progress active={0} />
      </ScrollView>
      <Footer
        brand="Weekender"
        compact
        links={[
          { label: "Privacy", onPress: () => {} },
          { label: "Help", onPress: () => {} },
        ]}
        colorStyle={palette}
      />
    </>
  );
}

function PlanScreen({ goTo }) {
  const [plans, setPlans] = useState(savedPlans);

  const movePlan = (_, from, to) => {
    setPlans((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <>
      <Header
        title="Your plan"
        subtitle="Saturday · September 26"
        colorStyle={palette}
        leftAction={{ label: "Back", onPress: () => goTo(0) }}
        rightAction={{ label: "Edit", onPress: () => goTo(2) }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.planSummary}>
          <Text style={styles.summaryEmoji}>☀️</Text>
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>A gentle Saturday</Text>
            <Text style={styles.summaryCopy}>
              Three easy stops, all close to home.
            </Text>
          </View>
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Your route</Text>
          <Text style={styles.reorderHint}>Use arrows to reorder</Text>
        </View>
        <View style={styles.listCard}>
          <List
            items={plans}
            variant="draggable"
            onMoveItem={movePlan}
            colorStyle={palette}
          />
        </View>
        <View style={styles.noteCard}>
          <Text style={styles.noteLabel}>A SMALL REMINDER</Text>
          <Text style={styles.noteText}>
            The market opens at 9:00 AM. Arriving early means the best pastries.
          </Text>
        </View>
        <SubmitButton
          label="Save this plan"
          colorStyle={palette}
          onPress={() => goTo(2)}
          style={styles.primaryButton}
        />
        <Progress active={1} />
      </ScrollView>
      <Footer
        brand="Weekender"
        compact
        links={[
          { label: "Start over", onPress: () => goTo(0) },
          { label: "Share", onPress: () => {} },
        ]}
        colorStyle={palette}
      />
    </>
  );
}

function ProfileScreen({ goTo }) {
  const [name, setName] = useState("Qier");
  const [pace, setPace] = useState("easy");
  const [saved, setSaved] = useState(false);
  const paceOptions = [
    { label: "Easy and unhurried", value: "easy" },
    { label: "A balanced day", value: "balanced" },
    { label: "Fit in as much as possible", value: "full" },
  ];

  return (
    <>
      <Header
        title="Make it yours"
        subtitle="A few details go a long way"
        colorStyle={palette}
        leftAction={{ label: "Back", onPress: () => goTo(1) }}
        rightAction={{ label: "Done", onPress: () => goTo(0) }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.slice(0, 1).toUpperCase() || "W"}
          </Text>
        </View>
        <Text style={styles.profileHeading}>Your planning style</Text>
        <Text style={styles.sectionCopy}>
          This helps us suggest a day that fits your energy.
        </Text>
        <View style={styles.formCard}>
          <TextField
            label="What should we call you?"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            colorStyle={palette}
          />
          <SelectField
            label="Ideal pace"
            value={pace}
            onChange={setPace}
            options={paceOptions}
            colorStyle={palette}
          />
        </View>
        {saved ? (
          <View style={styles.savedNotice} accessibilityRole="alert">
            <Text style={styles.savedText}>
              Preferences saved — your next plan will reflect them.
            </Text>
          </View>
        ) : null}
        <SubmitButton
          label={saved ? "Saved" : "Save preferences"}
          onPress={() => setSaved(true)}
          disabled={saved}
          colorStyle={palette}
          style={styles.primaryButton}
        />
        <SubmitButton
          label="View my plan"
          variant="secondary"
          onPress={() => goTo(1)}
          colorStyle={palette}
        />
        <Progress active={2} />
      </ScrollView>
      <Footer
        brand="Weekender"
        compact
        links={[
          { label: "Account", onPress: () => {} },
          { label: "Sign out", onPress: () => {} },
        ]}
        colorStyle={palette}
      />
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const Screen = [DiscoverScreen, PlanScreen, ProfileScreen][screen];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <Screen goTo={setScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  content: { flexGrow: 1, padding: 20, paddingBottom: 28 },
  heroCard: {
    backgroundColor: "#DDE6FF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },
  overline: {
    color: "#2855D9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 10,
  },
  heroTitle: {
    color: palette.text,
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 35,
    marginBottom: 10,
  },
  heroCopy: { color: "#46536C", fontSize: 15, lineHeight: 22 },
  sectionTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  sectionCopy: {
    color: palette.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  primaryButton: { marginBottom: 12 },
  progress: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    marginTop: 24,
  },
  progressDot: {
    backgroundColor: "#C7D0E3",
    borderRadius: 4,
    height: 6,
    width: 6,
  },
  progressDotActive: { backgroundColor: palette.primary, width: 22 },
  planSummary: {
    alignItems: "center",
    backgroundColor: "#FDF0D5",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 27,
    padding: 18,
  },
  summaryEmoji: { fontSize: 32, marginRight: 14 },
  summaryText: { flex: 1 },
  summaryTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  summaryCopy: { color: "#665431", fontSize: 13, lineHeight: 18 },
  sectionRow: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reorderHint: { color: palette.mutedText, fontSize: 12 },
  noteCard: {
    backgroundColor: "#EDF8F2",
    borderRadius: 14,
    marginBottom: 20,
    padding: 17,
  },
  noteLabel: {
    color: "#1C8C57",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 7,
  },
  noteText: { color: "#315746", fontSize: 14, lineHeight: 20 },
  avatar: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2855D9",
    borderRadius: 38,
    height: 76,
    justifyContent: "center",
    marginBottom: 20,
    width: 76,
  },
  avatarText: { color: "#FFFFFF", fontSize: 30, fontWeight: "800" },
  profileHeading: {
    color: palette.text,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 7,
  },
  formCard: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: 18,
    marginBottom: 20,
    padding: 18,
  },
  savedNotice: {
    backgroundColor: "#EDF8F2",
    borderRadius: 12,
    marginBottom: 16,
    padding: 13,
  },
  savedText: {
    color: "#246B46",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
});
