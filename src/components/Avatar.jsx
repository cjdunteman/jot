import * as Avatar from '@radix-ui/react-avatar';
import './AvatarStyles.css'

export default () => (
  <Avatar.Root>
    <Avatar.Image 
    className="AvatarImage"
    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
    alt="Colm Tuite"/>
    <Avatar.Fallback className="AvatarFallback" delayMs={600}>CJ</Avatar.Fallback>
  </Avatar.Root>
);