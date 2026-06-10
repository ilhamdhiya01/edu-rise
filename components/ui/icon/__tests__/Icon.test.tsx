import { render } from '@testing-library/react';
import { TbPlus } from 'react-icons/tb';
import { describe, expect, it } from 'vitest';

import Icon from '../Icon';

describe('Icon', () => {
  it('Should display correct icon', () => {
    const iconComponent = render(<Icon size={24} icon="TbPlus" />);
    const iconTabler = render(<TbPlus size={24} />);
    expect(iconComponent.container).toEqual(iconTabler.container);
  });

  it('Should display correct icon with color', () => {
    const iconComponent = render(
      <Icon size={24} icon="TbPlus" className="text-red-500" />
    );
    const iconTabler = render(<TbPlus size={24} className="text-red-500" />);
    expect(iconComponent.container).toEqual(iconTabler.container);
  });
});
