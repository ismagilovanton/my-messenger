import Block from '../../framework/Block';
import { User } from '../../types/user.types';
import template from './user-card.tmpl';
import './user-card.scss';

interface UserCardProps {
  props: {
    user: User,
    isOwner: boolean
  },
  attributes?: {
    'data-id': string
  }
}

export class UserCard extends Block {
  constructor(props: UserCardProps, tagName = 'div') {
    super(tagName, {
      ...props,
    });
  }

  render() {
    return template;
  }
}
