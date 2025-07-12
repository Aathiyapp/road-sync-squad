import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  Clock, 
  Navigation, 
  Vote, 
  MessageCircle,
  MoreVertical,
  Share2,
  AlertTriangle,
  Fuel,
  Coffee,
  Camera
} from "lucide-react";

const RideDetail = () => {
  const { id } = useParams();
  const [voteResults] = useState([
    { option: "Continue to Nandi Hills", votes: 4, percentage: 67 },
    { option: "Stop at Cafe Noir first", votes: 2, percentage: 33 }
  ]);

  const [members] = useState([
    { id: 1, name: "Alex", avatar: "", status: "riding", eta: "2h 15m", distance: "12.3 km" },
    { id: 2, name: "Sarah", avatar: "", status: "riding", eta: "2h 20m", distance: "14.1 km" },
    { id: 3, name: "Mike", avatar: "", status: "stopped", eta: "2h 45m", distance: "8.7 km" },
    { id: 4, name: "Emma", avatar: "", status: "riding", eta: "2h 10m", distance: "15.2 km" },
    { id: 5, name: "Josh", avatar: "", status: "riding", eta: "2h 25m", distance: "11.8 km" },
    { id: 6, name: "Lisa", avatar: "", status: "riding", eta: "2h 18m", distance: "13.5 km" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-adventure bg-clip-text text-transparent">
              Weekend Adventure to Nandi Hills
            </h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Nandi Hills, Karnataka</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>6 members</span>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Live Route Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/10 to-adventure/10 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-primary/30">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Live Map</h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time positions of all group members
                    </p>
                    <Button variant="adventure">
                      Open Full Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Vote */}
            <Card className="shadow-adventure">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-secondary" />
                  Active Vote: Next Stop Decision
                </CardTitle>
                <CardDescription>Vote closes in 15 minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {voteResults.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{option.option}</span>
                      <span className="text-sm text-muted-foreground">{option.votes} votes</span>
                    </div>
                    <Progress value={option.percentage} className="h-2" />
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button variant="adventure" size="sm">
                    Vote: Continue to Nandi Hills
                  </Button>
                  <Button variant="outline" size="sm">
                    Vote: Stop at Cafe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <Fuel className="h-5 w-5 mb-1" />
                <span className="text-sm">Fuel Stop</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Coffee className="h-5 w-5 mb-1" />
                <span className="text-sm">Food Break</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <AlertTriangle className="h-5 w-5 mb-1" />
                <span className="text-sm">SOS Alert</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Camera className="h-5 w-5 mb-1" />
                <span className="text-sm">Share Photo</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Group Members */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-adventure" />
                  Group Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.distance} away
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={member.status === 'riding' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {member.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        ETA {member.eta}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Preview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Group Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Sarah</div>
                    <div className="text-sm text-muted-foreground">
                      Weather looks perfect! 🌤️
                    </div>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Mike</div>
                    <div className="text-sm text-muted-foreground">
                      Need to fuel up, voting for cafe stop
                    </div>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Alex</div>
                    <div className="text-sm text-muted-foreground">
                      Let's stick to the plan 🏍️
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Open Chat
                </Button>
              </CardContent>
            </Card>

            {/* Ride Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Ride Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2h 30m</div>
                    <div className="text-xs text-muted-foreground">ETA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-adventure">87 km</div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">45 km/h</div>
                    <div className="text-xs text-muted-foreground">Avg Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">2</div>
                    <div className="text-xs text-muted-foreground">Stops</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetail;