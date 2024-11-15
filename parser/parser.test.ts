
import { parse } from './parserFunc';
import { VariablesObj } from '../types/types';

describe('parse function', () => {
  it('replaces all variables with values in the object', () => {
    const variables: VariablesObj = { name: 'Alice', city: 'Wonderland' };
    const template = "Hello {{name}}, welcome to {{city}}!";
    const result = parse(variables, template);
    expect(result).toBe("Hello Alice, welcome to Wonderland!");
  });

  it('handles templates without any variables', () => {
    const variables: VariablesObj = { name: 'Alice' };
    const template = "Welcome, guest!";
    const result = parse(variables, template);
    expect(result).toBe("Welcome, guest!"); 
  });

  it('handles empty strings for both template and variables', () => {
    const variables: VariablesObj = {};
    const template = "";
    const result = parse(variables, template);
    expect(result).toBe(""); // Nothing to replace
  });

  it('does not replace when variable key in template does not match', () => {
    const variables: VariablesObj = { user: 'Alice' };
    const template = "Hello {{name}}!";
    const result = parse(variables, template);
    expect(result).toBe("Hello {{name}}!"); // `{{name}}` remains since no matching key
  });
});
