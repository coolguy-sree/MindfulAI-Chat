import { TherapistProfile } from '../types';

export const mockTherapists: TherapistProfile[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson, Ph.D.",
    specialty: "Cyberbullying Recovery & Digital Trauma",
    rating: 4.9,
    website: "https://www.betterhelp.com",
    availability: "Mon-Fri: 9:00 AM - 6:00 PM",
    credentials: [
      "Licensed Clinical Psychologist",
      "Certified Cyber Trauma Professional",
      "Digital Wellness Specialist",
      "15+ years experience in online harassment recovery"
    ],
    aiMatchScore: 98
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen, Psy.D.",
    specialty: "Social Media Anxiety & Digital Identity",
    rating: 4.8,
    website: "https://www.talkspace.com",
    availability: "Tue-Sat: 10:00 AM - 7:00 PM",
    credentials: [
      "Licensed Psychologist",
      "Social Media Mental Health Specialist",
      "Digital Anxiety Expert",
      "Online Reputation Recovery Counselor"
    ],
    aiMatchScore: 95
  },
  {
    id: "dr-emily-martinez",
    name: "Dr. Emily Martinez, Ph.D., LMFT",
    specialty: "Digital Wellness & Online Harassment Recovery",
    rating: 4.9,
    website: "https://www.psychologytoday.com/us/therapists",
    availability: "Mon-Thu: 8:00 AM - 5:00 PM",
    credentials: [
      "Licensed Marriage and Family Therapist",
      "Certified Digital Trauma Specialist",
      "Cyberbullying Prevention Expert",
      "Online Safety Counselor"
    ],
    aiMatchScore: 92
  }
];