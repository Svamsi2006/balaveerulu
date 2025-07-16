
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, MessageSquare, BookOpen, Settings } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "balaveerulu2024") {
      setIsAuthenticated(true);
      toast.success("Welcome to Admin Panel!");
    } else {
      toast.error("Invalid password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-comic text-center text-gray-700">Admin Login 🔐</CardTitle>
            <CardDescription className="text-center">Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 focus:border-blue-500"
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-comic text-blue-600 mb-2">Admin Panel 👨‍💼</h1>
          <p className="text-gray-600">Manage content and settings for Balaveerulu.com</p>
        </div>

        <Tabs defaultValue="stories" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stories" className="flex items-center space-x-2">
              <BookOpen size={16} />
              <span>Stories</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Image size={16} />
              <span>Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare size={16} />
              <span>Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings size={16} />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="text-blue-600" />
                  <span>Story Management</span>
                </CardTitle>
                <CardDescription>Add new stories and manage existing ones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Story Title</label>
                  <Input placeholder="Enter story title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Theme</label>
                  <Input placeholder="e.g., Hanuman Adventure, Space Explorer" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Description</label>
                  <Textarea placeholder="Brief description of the story" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Template</label>
                  <Textarea placeholder="Story template with placeholders for personalization" rows={8} />
                </div>
                <Button className="w-full">Add New Story</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="text-green-600" />
                  <span>Gallery Management</span>
                </CardTitle>
                <CardDescription>Upload and manage gallery images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">Drag and drop images or click to upload</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Sample {i}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full">Update Gallery</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="text-purple-600" />
                  <span>Customer Feedback</span>
                </CardTitle>
                <CardDescription>View and manage customer messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@example.com", subject: "Amazing service!", message: "My child loves the comic book!", date: "2024-01-15" },
                    { name: "Jane Smith", email: "jane@example.com", subject: "Question about printing", message: "How long does printing take?", date: "2024-01-14" },
                    { name: "Mike Johnson", email: "mike@example.com", subject: "Feature request", message: "Can you add more themes?", date: "2024-01-13" }
                  ].map((feedback, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{feedback.name}</h4>
                          <p className="text-sm text-gray-600">{feedback.email}</p>
                        </div>
                        <span className="text-sm text-gray-500">{feedback.date}</span>
                      </div>
                      <h5 className="font-medium text-gray-800 mb-1">{feedback.subject}</h5>
                      <p className="text-gray-600">{feedback.message}</p>
                      <div className="mt-3 space-x-2">
                        <Button size="sm" variant="outline">Reply</Button>
                        <Button size="sm" variant="outline">Mark as Read</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="text-orange-600" />
                  <span>System Settings</span>
                </CardTitle>
                <CardDescription>Configure system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Maintenance Mode</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="maintenance" />
                    <label htmlFor="maintenance">Enable maintenance mode</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Upload Size (MB)</label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Notifications</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="order-notifications" defaultChecked />
                      <label htmlFor="order-notifications">New order notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="feedback-notifications" defaultChecked />
                      <label htmlFor="feedback-notifications">Feedback notifications</label>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
