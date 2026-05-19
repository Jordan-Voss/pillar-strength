import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export type FilterKey = 'all' | 'strength' | 'accessory' | 'core' | 'bodyweight';

type FilterChip = {
  key: FilterKey;
  label: string;
};

const filters: FilterChip[] = [
  { key: 'all', label: 'All' },
  { key: 'strength', label: 'Strength' },
  { key: 'accessory', label: 'Accessory' },
  { key: 'core', label: 'Core' },
  { key: 'bodyweight', label: 'Bodyweight' },
];

export function ExerciseSearchPanel({
  query,
  onChangeQuery,
  activeFilter,
  onChangeFilter,
  resultText,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
  activeFilter: FilterKey;
  onChangeFilter: (filter: FilterKey) => void;
  resultText: string;
}) {
  return (
    <View style={styles.searchPanel}>
      <View style={styles.searchInputWrap}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Search bench, squat, delts..."
          placeholderTextColor={theme.colors.input.placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          style={styles.searchInput}
        />

        {query.trim().length > 0 ? (
          <Pressable
            hitSlop={10}
            onPress={() => onChangeQuery('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter.key}
            filter={filter}
            active={filter.key === activeFilter}
            onPress={() => onChangeFilter(filter.key)}
          />
        ))}
      </ScrollView>

      <Text style={styles.resultText}>{resultText}</Text>
    </View>
  );
}

function FilterButton({
  filter,
  active,
  onPress,
}: {
  filter: FilterChip;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterButton,
        active && styles.filterButtonActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.filterButtonText, active && styles.filterButtonTextActive]}>
        {filter.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchPanel: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  searchInputWrap: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.input.background,
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  searchIcon: {
    color: theme.colors.text.secondary,
    fontSize: 20,
    fontWeight: '800',
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.input.text,
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.sm,
  },
  clearButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  clearButtonText: {
    color: theme.colors.text.link,
    fontSize: 13,
    fontWeight: '800',
  },
  filterRow: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  filterButton: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.bg.secondary,
  },
  filterButtonActive: {
    borderColor: theme.colors.interactive.primary,
    backgroundColor: 'rgba(215, 38, 61, 0.10)',
  },
  filterButtonText: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    fontWeight: '800',
  },
  filterButtonTextActive: {
    color: theme.colors.interactive.primary,
  },
  resultText: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
});