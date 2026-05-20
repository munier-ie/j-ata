import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Calendar, Search, Star, BookOpen, Clock, Check, Download } from "lucide-react";

export default function MentorPortal() {
  const [registered, setRegistered] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    bio: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skillsList = [
    "Agronomy", "Crop Protection", "Supply Chain", "Marketing", 
    "Software Development", "Financial Planning", "Export Logistics", "Irrigation"
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    toast({
      title: "Registration Successful",
      description: "You have been registered as a mentor.",
    });
  };

  const [mentors] = useState([
    { id: 1, name: "Dr. Ibrahim Musa", spec: "Agronomist", skills: ["Crop Yield", "Soil Health"], rating: 4.8 },
    { id: 2, name: "Aisha Bello", spec: "Tech Founder", skills: ["Software", "Scaling"], rating: 4.9 },
    { id: 3, name: "Kabiru Balan", spec: "Financial Advisor", skills: ["Funding", "Tax"], rating: 4.5 },
  ]);

  const [sessions] = useState([
    { id: 1, mentor: "Dr. Ibrahim Musa", topic: "Soil Mapping Prep", time: "Mon, 10:00 AM", status: "Scheduled" },
    { id: 2, mentor: "Aisha Bello", topic: "MVP Feedback", time: "Wed, 2:00 PM", status: "Pending" },
  ]);

  const [mentorSessions] = useState([
    { id: 1, user: "Aliyu Ahmed", topic: "Irrigation Setup", time: "Thu, 11:00 AM", status: "Confirmed" },
    { id: 2, user: "Fatima Yusuf", topic: "Export Strategy", time: "Fri, 4:00 PM", status: "Pending" },
  ]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mentor Matching & Portal</h1>
            <p className="text-muted-foreground">Connect with experts or register as a mentor.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Registration or My Profile */}
          <div className="lg:col-span-1">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  {registered ? "Mentor Profile" : "Register as Mentor"}
                </CardTitle>
                <CardDescription>
                  {registered ? "Your profile is active." : "Share your expertise with startups."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!registered ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={formData.fullName} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <select id="specialization" value={formData.specialization} onChange={handleInputChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Select...</option>
                        <option value="AgTech">AgTech</option>
                        <option value="Business">Business</option>
                        <option value="Agronomy">Agronomy</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Skills (Multi-select)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {skillsList.map((skill) => (
                          <div 
                            key={skill} 
                            onClick={() => toggleSkill(skill)}
                            className={`text-xs p-2 rounded border cursor-pointer text-center transition-colors ${
                              selectedSkills.includes(skill) ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-muted-foreground border-border hover:bg-secondary/80'
                            }`}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full">Register</Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                        {formData.fullName.charAt(0) || "M"}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{formData.fullName || "Mentor Name"}</p>
                        <p className="text-xs text-muted-foreground">{formData.specialization || "Expert"}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkills.map(skill => (
                          <span key={skill} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{skill}</span>
                        ))}
                        {selectedSkills.length === 0 && <span className="text-xs text-muted-foreground">No skills selected</span>}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setRegistered(false)}>Edit Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Matching & Scheduler */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Match with Startups */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Match with Startups
                </CardTitle>
                <CardDescription>Startups matching your expertise.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, name: "EcoFarm Solutions", sector: "AgTech", need: "Crop Yield Optimization" },
                    { id: 2, name: "Jigawa Green", sector: "Agronomy", need: "Soil Health" },
                  ].map((startup) => (
                    <div key={startup.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-foreground">{startup.name}</p>
                        <p className="text-sm text-muted-foreground">Sector: {startup.sector}</p>
                        <p className="text-xs text-muted-foreground mt-1">Needs help with: {startup.need}</p>
                      </div>
                      <Button size="sm">Offer Mentorship</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Scheduler */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Your Sessions
                </CardTitle>
                <CardDescription>Manage your mentoring schedule.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">With {session.mentor}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" /> {session.time}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          session.status === 'Scheduled' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booked Sessions with You (Visible to registered mentors) */}
            {registered && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Booked Sessions with You
                  </CardTitle>
                  <CardDescription>Manage sessions booked by startups and individuals.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorSessions.map((session) => (
                      <div key={session.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">Booked by: {session.user}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1" /> {session.time}
                          </div>
                          <div className="flex gap-1">
                            {session.status === 'Pending' ? (
                              <>
                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">Approve</Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">Decline</Button>
                              </>
                            ) : (
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-500/10 text-green-600">
                                {session.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
