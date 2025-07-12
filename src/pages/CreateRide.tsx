import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Shield, Route, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CreateRide = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destination: "",
    startLocation: "",
    rideType: "",
    maxMembers: 10,
    isPrivate: false,
    allowVoting: true,
    safetyMode: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ride Created Successfully! 🚀",
      description: `"${formData.name}" is ready for riders to join.`,
    });
    navigate("/dashboard");
  };

  const rideTypes = [
    { value: "scenic", label: "Scenic Route", icon: "🌄" },
    { value: "fast", label: "Fast Route", icon: "⚡" },
    { value: "highway", label: "Highway Cruise", icon: "🛣️" },
    { value: "fuel-stop", label: "Fuel & Food Stops", icon: "⛽" },
    { value: "adventure", label: "Off-road Adventure", icon: "🏍️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-adventure/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-adventure bg-clip-text text-transparent">
            Create New Ride
          </h1>
          <p className="text-muted-foreground mt-2">Set up your next adventure and invite riders to join</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>Tell riders about your planned adventure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rideName">Ride Name</Label>
                  <Input
                    id="rideName"
                    placeholder="e.g., Weekend Adventure to Nandi Hills"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rideType">Ride Type</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, rideType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose ride style" />
                    </SelectTrigger>
                    <SelectContent>
                      {rideTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            {type.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your ride plans, what to expect, and any special requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Route Planning */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-adventure" />
                Route Planning
              </CardTitle>
              <CardDescription>Set your starting point and destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startLocation">Starting Location</Label>
                  <Input
                    id="startLocation"
                    placeholder="e.g., Bangalore City Center"
                    value={formData.startLocation}
                    onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Nandi Hills"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-gradient-to-br from-primary/10 to-adventure/10 rounded-lg p-8 text-center border-2 border-dashed border-primary/30">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Route Planning</h3>
                <p className="text-muted-foreground">
                  Click to open the interactive map and plan your route with waypoints
                </p>
                <Button variant="adventure" className="mt-4">
                  Open Route Planner
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Group Settings
              </CardTitle>
              <CardDescription>Configure how your group will work together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Maximum Members</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    min="2"
                    max="50"
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isPrivate">Private Ride</Label>
                    <p className="text-sm text-muted-foreground">Only people with invite link can join</p>
                  </div>
                  <Switch
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowVoting">Allow Destination Voting</Label>
                    <p className="text-sm text-muted-foreground">Members can vote to change route or stops</p>
                  </div>
                  <Switch
                    id="allowVoting"
                    checked={formData.allowVoting}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowVoting: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="safetyMode">Safety Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable emergency features and location sharing</p>
                  </div>
                  <Switch
                    id="safetyMode"
                    checked={formData.safetyMode}
                    onCheckedChange={(checked) => setFormData({ ...formData, safetyMode: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Enabled Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Real-time Location Sharing</Badge>
                <Badge variant="secondary">Group Chat</Badge>
                {formData.allowVoting && <Badge variant="default">Destination Voting</Badge>}
                {formData.safetyMode && <Badge variant="default">Safety Tracking</Badge>}
                <Badge variant="secondary">ETA Sync</Badge>
                <Badge variant="secondary">Fuel Alerts</Badge>
                {formData.isPrivate ? (
                  <Badge variant="outline">Private Group</Badge>
                ) : (
                  <Badge variant="outline">Open to Join</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" variant="hero" size="lg" className="flex-1">
              <Calendar className="h-5 w-5" />
              Create Ride
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRide;