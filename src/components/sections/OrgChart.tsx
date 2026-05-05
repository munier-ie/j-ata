import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Loader2 } from "lucide-react";
import { managementApi, ManagementMember } from "@/lib/api";

const NodeCard = ({ member, isRoot = false }: { member: ManagementMember; isRoot?: boolean }) => (
  <Card className={`relative z-10 mx-auto border-primary/40 ${isRoot ? 'w-full max-w-3xl bg-primary/5 border-primary' : 'w-full max-w-sm hover:border-primary transition-colors duration-300'}`}>
    <CardContent className={`p-6 ${isRoot ? 'flex flex-col md:flex-row gap-8 items-center text-center md:text-left' : 'text-center'}`}>
      <div className="relative shrink-0 group">
        <div className={`overflow-hidden border-4 border-primary/20 shadow-lg ${isRoot ? 'w-48 h-56 rounded-xl' : 'w-32 h-32 mx-auto rounded-full'}`}>
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-full object-cover transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        {isRoot && <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 text-sm font-semibold bg-primary hover:bg-primary/90">Leadership</Badge>}
      </div>
      
      <div className="space-y-4 pt-2">
        <div>
          <h3 className={`font-display font-bold text-foreground leading-tight ${isRoot ? 'text-3xl' : 'text-xl'}`}>{member.name}</h3>
          <p className="text-primary font-medium mt-1">{member.role}</p>
        </div>
        
        <div className={`relative text-muted-foreground leading-relaxed ${isRoot ? 'text-base' : 'text-sm'}`}>
          {member.bio}
        </div>
      </div>
    </CardContent>
  </Card>
);

export function OrgChart() {
  const [members, setMembers] = useState<ManagementMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await managementApi.getAll();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching management members:', error);
    } finally {
      setLoading(false);
    }
  };

  const commissioner = members.find(m => m.isCommissioner);
  const directors = members.filter(m => !m.isCommissioner);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-20">
          <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No leadership team members available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Leadership Structure</h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg opacity-80">
          Meet the dedicated team of professionals driving the vision and mission of the Ministry.
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-48 relative">
        {/* Root Node: Commissioner */}
        {commissioner && (
          <div className="relative w-full flex justify-center z-10 px-4">
            <NodeCard member={commissioner} isRoot />
            {/* Vertical Line from Root */}
            {directors.length > 0 && (
              <div className="absolute bottom-[-96px] left-1/2 w-0.5 h-24 bg-primary/60 hidden md:block">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
              </div>
            )}
          </div>
        )}

        {/* Level 2: Directors */}
        {directors.length > 0 && (
          <div className="w-full relative px-4">
            {/* Horizontal Connecting Line */}
            {commissioner && (
              <div className="absolute top-[-96px] left-[10%] right-[10%] h-0.5 bg-primary/60 hidden md:block" />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-12 gap-x-8">
              {directors.map((member) => (
                <div key={member.id} className="relative flex flex-col items-center">
                  {/* Vertical Line to Node */}
                  {commissioner && (
                    <div className="absolute top-[-96px] w-0.5 h-24 bg-primary/60 hidden md:block">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                    </div>
                  )}
                  <NodeCard member={member} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
