import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Navigation, Vote, MessageCircle } from "lucide-react";

const Dashboard = () => {
  const [activeRides] = useState([
    {
      id: 1,
      name: "Weekend Adventure to Nandi Hills",
      members: 6,
      destination: "Nandi Hills",
      eta: "2h 30m",
      status: "active",
      votes: 3
    },
    {
      id: 2,
      name: "Coffee Run",
      members: 3,
      destination: "Cafe Noir",
      eta: "45m",
      status: "planning",
      votes: 1
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Ride Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your active rides and join new adventures</p>
          </div>
          <NavLink to="/create-ride">
            <Button variant="hero" size="lg">
              Create New Ride
            </Button>
          </NavLink>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Active Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-sm text-muted-foreground">Currently riding</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-adventure" />
                Distance Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-adventure">127</div>
              <p className="text-sm text-muted-foreground">Kilometers traveled</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Ride Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">3h 15m</div>
              <p className="text-sm text-muted-foreground">On the road</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Rides */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Active Rides</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeRides.map((ride) => (
              <Card key={ride.id} className="shadow-adventure hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{ride.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {ride.destination}
                      </CardDescription>
                    </div>
                    <Badge variant={ride.status === 'active' ? 'default' : 'secondary'}>
                      {ride.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{ride.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">ETA {ride.eta}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Vote className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{ride.votes} votes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <NavLink to={`/ride/${ride.id}`} className="flex-1">
                      <Button variant="adventure" className="w-full">
                        <Navigation className="h-4 w-4" />
                        View Route
                      </Button>
                    </NavLink>
                    <Button variant="outline" size="default">
                      <MessageCircle className="h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavLink to="/find-riders">
              <Button variant="outline" className="w-full h-16 text-left justify-start">
                <div>
                  <div className="font-semibold">Find Nearby Riders</div>
                  <div className="text-sm text-muted-foreground">Join riders in your area</div>
                </div>
              </Button>
            </NavLink>
            
            <NavLink to="/safety">
              <Button variant="outline" className="w-full h-16 text-left justify-start">
                <div>
                  <div className="font-semibold">Safety Center</div>
                  <div className="text-sm text-muted-foreground">Emergency contacts & SOS</div>
                </div>
              </Button>
            </NavLink>
            
            <NavLink to="/history">
              <Button variant="outline" className="w-full h-16 text-left justify-start">
                <div>
                  <div className="font-semibold">Ride History</div>
                  <div className="text-sm text-muted-foreground">View past adventures</div>
                </div>
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;