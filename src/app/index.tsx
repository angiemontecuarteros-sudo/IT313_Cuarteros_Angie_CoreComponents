
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Student = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
};

const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Ana Cruz",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=1",
    flagged: false,
  },
  {
    id: "s2",
    name: "Bea Santos",
    year: "2nd Year",
    photoUrl: "https://i.pravatar.cc/100?img=2",
    flagged: false,
  },
  {
    id: "s3",
    name: "Cid Ramos",
    year: "4th Year",
    photoUrl: "https://i.pravatar.cc/100?img=3",
    flagged: false,
  },
  {
    id: "s4",
    name: "Dex Alonzo",
    year: "1st Year",
    photoUrl: "https://i.pravatar.cc/100?img=4",
    flagged: false,
  },
  {
    id: "s5",
    name: "Eli Tan",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=5",
    flagged: false,
  },
];

type StudentCardProps = {
  student: Student;
  onToggleFlag: (id: string) => void;
};

function StudentCard({ student, onToggleFlag }: StudentCardProps) {
  return (
    <View style={styles.studentCard}>
      <Image
        source={{ uri: student.photoUrl }}
        style={styles.profileImage}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentYear}>{student.year}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(student.id)}
        style={[
          styles.actionButton,
          student.flagged && styles.flaggedButton,
        ]}
      >
        <Text
          style={[
            styles.star,
            student.flagged && styles.activeStar,
          ]}
        >
          {student.flagged ? "★" : "☆"}
        </Text>

        <Text
          style={[
            styles.flagText,
            student.flagged && styles.flaggedText,
          ]}
        >
          {student.flagged ? "Flagged" : "Flag"}
        </Text>
      </Pressable>
    </View>
  );
}

export default function StudentDirectory() {
  const [students, setStudents] = useState(initialStudents);
  const [searchText, setSearchText] = useState("");

  const toggleFlag = (id: string) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Directory</Text>
        <Text style={styles.subtitle}>
          Browse and manage student profiles
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search student name..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onToggleFlag={toggleFlag}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No students found.
          </Text>
        )}
      </ScrollView>

      <Text style={styles.footer}>
        Total Students: {students.length}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F7",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#7B2D68",
  },

  subtitle: {
    fontSize: 14,
    color: "#9B6A8E",
    marginTop: 5,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E8B6D2",
    marginBottom: 18,
  },

  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F5D5E8",
  },

  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#54264B",
  },

  studentYear: {
    fontSize: 13,
    color: "#9B6A8E",
    marginTop: 4,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#F4D6E8",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 8,
  },

  flaggedButton: {
    backgroundColor: "#7B2D68",
  },

  star: {
    fontSize: 19,
    color: "#E5A000",
  },

  activeStar: {
    color: "#FFFFFF",
  },

  flagText: {
    color: "#7B2D68",
    fontSize: 12,
    fontWeight: "bold",
  },

  flaggedText: {
    color: "#FFFFFF",
  },

  emptyText: {
    textAlign: "center",
    color: "#9B6A8E",
    marginTop: 30,
    fontSize: 15,
  },

  footer: {
    textAlign: "center",
    color: "#7B2D68",
    fontWeight: "bold",
    paddingVertical: 15,
  },
});
