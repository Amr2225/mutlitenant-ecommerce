import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div>
      <Button variant='elevated'>Click me</Button>
      <Input placeholder='Enter your name' />
      <Progress value={50} />
    </div>
  );
}
